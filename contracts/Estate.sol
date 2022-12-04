// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

/// @title Estate Contract
/// @author Odubawo Eniayo
/// @notice A contract to facilitate buying and selling of property backed tokens. The erc1155 token standard is used to mimic the behaviour of security tokens

contract Estate is ERC1155{

    string public name = "Estate";

    uint public tokenQuantity;
    uint public tokenPrice;
    uint public roi;
    uint public holdPeriodInYears;
    uint public minimumHoldPeriodInYears;
    uint public holdPeriodTimeStamp;
    uint public minimumHoldPeriodTimeStamp;
    uint public propertyValue;
    bool private isTokenResellable;
    string public legalDocuments;
    string public propertyName;
    address payable propertyOperator;

    uint private constant tokenId = 0;
    bytes private constant nullData = "0x00";

    mapping(address => uint) investorTokens;
    mapping(address => bool) isInvestor;
    address[] allInvestors;

    event TokenBought(
        uint indexed tokenAmount,
        address indexed investorAddr
    );

    event TokenSold(
        uint indexed tokenAmount,
        address indexed initialInvestor,
        address indexed newInvestor
    );

    event FundsWithdrawn(
        uint indexed tokenAmount,
        uint indexed roi,
        address indexed investorAddr
    );  

    event EstateDeleted(
        uint indexed timeStamp,
        address indexed operatorAddr
    );        

    error TokenNotAvailableToBeSold();

    modifier onlyOperator() {
        require(msg.sender == propertyOperator);
        _;
    }

    /// @param _tokenQuantity The number of tokens available for sale
    /// @param _tokenPrice Price of a token
    /// @param _roi return on investment
    /// @param _holdPeriodInYears Years for the payback period of your investment
    /// @param _minimumHoldPeriodInYears Years after which tokens can be resold to other investors
    /// @param _propertyValue Value of listed property
    /// @param _isTokenResellable Can the token be resold to other investors
    /// @param _legalDocuments All required documents to prove ownership and validity of property
    /// @param _propertyName The name of the property
    /// @param _propertyOperator The address of the property operator
    constructor (
        uint _tokenQuantity,
        uint _tokenPrice,
        uint _roi,
        uint _holdPeriodInYears,
        uint _minimumHoldPeriodInYears,
        uint _propertyValue,
        bool _isTokenResellable,
        string memory _legalDocuments,
        string memory _propertyName,
        address payable _propertyOperator
    ) ERC1155(_legalDocuments) payable{

        tokenQuantity = _tokenQuantity;
        tokenPrice = _tokenPrice;
        roi = _roi;
        holdPeriodInYears = _holdPeriodInYears;
        minimumHoldPeriodInYears = _minimumHoldPeriodInYears;

        holdPeriodTimeStamp = calcYears(_holdPeriodInYears);
        minimumHoldPeriodTimeStamp = calcYears(_minimumHoldPeriodInYears);

        propertyValue = _propertyValue;
        isTokenResellable = _isTokenResellable;
        legalDocuments = _legalDocuments;
        propertyName = _propertyName;
        propertyOperator = _propertyOperator;

    }

    receive() external payable {}

    /// @notice Allows investors buy property tokens
    /// @param amount Number of tokens investor wants to buy 
    function buyToken(uint amount) external payable returns(bool) {
        require(amount <= tokenQuantity, "quantity exceeded");
        require(!isInvestor[msg.sender], "already an investor");
        require(msg.sender != propertyOperator);
        require(msg.value >= amount * tokenPrice);


        tokenQuantity -= amount;
        isInvestor[msg.sender] = true;
        investorTokens[msg.sender] = amount;
        allInvestors.push(msg.sender);

        // erc1155 
        _mint(msg.sender, tokenId, amount, nullData);
        
        emit TokenBought(amount, msg.sender);

        return true;
    }

    /// @notice Allows investors sell tokens to new investors if the token is resellable
    /// @param amount Number of tokens investor wants to sell
    /// @param _to Address of new investor 
    function sellToken(uint amount, address _to) external payable {
        require(tokenQuantity == 0, "resell not possible till all tokens are exhausted");
        require(isTokenResellable, "not able to be sold");
        require(block.timestamp >= minimumHoldPeriodTimeStamp, "tokens not available to be sold yet");
        require(!isInvestor[_to], "already an investor");
        require(_to != propertyOperator, "invalid address");
        require(_to != address(0), "invalid address");
        require(_to != msg.sender, "invalid address");
        require(amount > 0);
        require(amount <= investorTokens[msg.sender], "invalid amount");

        if(amount == investorTokens[msg.sender]){
            clearInvestorInfo();

            isInvestor[_to] = true;
            investorTokens[_to] = amount;
            allInvestors.push(_to);

            // erc1155 
            safeTransferFrom(msg.sender, _to, tokenId, amount, nullData);
        } else {
            investorTokens[msg.sender] -= amount;

            isInvestor[_to] = true;
            investorTokens[_to] = amount;
            allInvestors.push(_to);

            // erc1155 
            safeTransferFrom(msg.sender, _to, tokenId, amount, nullData);                        
        }

        emit TokenSold(amount, msg.sender, _to);
    }

    /// @notice Allows investors withdraw their investment income
    function withdrawFunds() public {
        require(block.timestamp >= holdPeriodTimeStamp);
        require(isInvestor[msg.sender], "not an investor");
        require(investorTokens[msg.sender] > 0, "insufficient tokens");

        uint tokenAmount = investorTokens[msg.sender];
        uint val = tokenAmount * tokenPrice;
        uint payout = (roi * val) / 100;

        (bool success,) = payable(msg.sender).call{value: payout}("");
        require(success, "Transfer failed!");

        if(success){
            emit FundsWithdrawn(tokenAmount, payout, msg.sender);
            clearInvestorInfo();

            // erc1155 
            _burn(msg.sender, tokenId, balanceOf(msg.sender, tokenId));            
        }

        if(numberOfInvestors() == 0) {
            selfdestruct(propertyOperator);
            emit EstateDeleted(block.timestamp, propertyOperator);
        }
    }

    /// @notice Returns the native token balance of the contract
    function getBalance() external view onlyOperator returns(uint) {
        return address(this).balance;
    }

    /// @notice Function the operator calls after the all tokens have been called in order to fund the project
    function withDrawInvestments() external onlyOperator {
       require(tokenQuantity == 0, "cannot withdraw till all tokens are sold");

       (bool success,) = propertyOperator.call{value: address(this).balance}("");
       require(success, "Transfer failed!");
    }

    /// @notice Function the operator calls after all investors have been payed out. 
    function deleteEstate() external onlyOperator {
        require(numberOfInvestors() == 0, "");
        require(block.timestamp >= holdPeriodTimeStamp);

        selfdestruct(propertyOperator);
        emit EstateDeleted(block.timestamp, propertyOperator);
    }

    /// @notice Returns the property token balance of an investor
    function tokenBalance(address _addr) public view returns(uint){
        return investorTokens[_addr];
    }

    /// @notice Returns total number of investors
    function numberOfInvestors() public view returns(uint){
        return allInvestors.length;
    }

    /// @notice Utility function to calculate timestamp given an integer number in years
    function calcYears(uint year) private view returns(uint timeStamp){
        return (year * 52 weeks) + block.timestamp;
    }

    /// @notice Utility function to remove an investor from all relevant data strucures
    function removeInvestorFromArray(uint index) private {
        allInvestors[index] = allInvestors[allInvestors.length - 1];
        allInvestors.pop();
    }
    /// @notice Utility function toset investors tokens to zero and update relevant data structures
    /// @dev This function is called if an investor sells all their tokens or calls withDrawFunds
    function clearInvestorInfo() private {
        isInvestor[msg.sender] = false;
        investorTokens[msg.sender] = 0;
            
        for(uint i = 0; i < allInvestors.length; i++){
            if(allInvestors[i] == msg.sender){
                removeInvestorFromArray(i);
                break;
            }
        }        
    }

    /// @notice Checks if a token is resellable
    function checkIfTokenResellable() external view returns(bool){
        return isTokenResellable;
    }

    /// @notice Gets contract operator address
    function getOperator() external view returns(address) {
        return propertyOperator;
    }

}