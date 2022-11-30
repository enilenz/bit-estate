// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

interface IEstateFactory {

}

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
        address indexed investorAddr,
    );  

    event EstateDeleted(
        uint indexed timeStamp,
        address indexed operatorAddr,
    );        

    error TokenNotAvailableToBeSold();

    modifier onlyOperator() {
        require(msg.sender == propertyOperator);
        _;
    }

    constructor (
        uint _tokenQuantity,
        uint _tokenPrice,
        uint _Roi,
        uint _holdPeriod,
        uint _minimumHoldPeriod,
        uint _propertyValue,
        bool _isTokenResellable,
        string memory _legalDocuments,
        string memory _propertyName,
        address payable _propertyOperator
    ) ERC1155(_legalDocuments) payable{

        holdPeriodTimeStamp = calcYears(_holdPeriod);
        minimumHoldPeriodTimeStamp = calcYears(_minimumHoldPeriod);

    }

    receive() external payable {}

    function buyToken(uint amount) public returns(bool) {
        require(block.timestamp < minimumHoldPeriodTimeStamp, "tokens not available");
        require(amount <= tokenQuantity, "quantity exceeded");
        require(!isInvestor[msg.sender], "already an investor");
        require(msg.value >= amount * tokenPrice);

        uint totalPrice = amount * tokenPrice;

        require(msg.value >= totalPrice);

        tokenQuantity -= amount;
        isInvestor[msg.sender] = true;
        investorTokens[msg.sender] = amount;
        allInvestors.push(msg.sender);
        
        emit TokenBought(amount, msg.sender);
    }

    function sellToken(uint amount, address _to) public {
        require(tokenQuantity == 0, "resell not possible till all tokens are exhausted");
        require(isTokenResellable, "not able to be sold");
        require(block.timestamp >= minimumHoldPeriodTimeStamp, "tokens not available to be sold yet");
        require(!isInvestor[_to], "already an investor");
        require(amount > 0);
        require(amount <= investorTokens[msg.sender], "invalid amount");

        if(amount == investorTokens[msg.sender]){
            clearInvestorInfo();

            isInvestor[_to] = true;
            investorTokens[_to] = amount;
            allInvestors.push(_to);
        } else {
            investorTokens[msg.sender] -= amount;

            isInvestor[_to] = true;
            investorTokens[_to] = amount;
            allInvestors.push(_to);            
        }

        emit TokenSold(amount, msg.sender, _to);
    }

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
        }

        if(numberOfInvestors() == 0) {
            selfdestruct(operator);
            emit EstateDeleted(block.timeStamp, propertyOperator);
        }
    }

    function getBalance() external view onlyOperator returns(uint) {
        return address(this).balance;
    }

    function withDrawInvestments() external onlyOperator {
       require(tokenQuantity == 0, "cannot withdraw till all tokens are sold");

       (bool success,) = propertyOperator.call{value: address(this).balance}("");
       require(success, "Transfer failed!");
    }

    function deleteEstate() external onlyOperator {
        require(numberOfInvestors() == 0, "");
        require(block.timestamp >= holdPeriodTimeStamp);

        selfdestruct(operator);
        emit EstateDeleted(block.timeStamp, propertyOperator);
    }

    function tokenBalance(address _addr) public returns(uint){
        return investorTokens[_addr];
    }

    function numberOfInvestors() public view returns(uint){
        return allInvestors.length;
    }

    function calcYears(uint year) private returns(uint timeStamp){
        return (year * 52 weeks) + block.timestamp;
    }

    function removeInvestorFromArray(uint index) private {
        allInvestors[index] = allInvestors[length - 1];
        allInvestors.pop();
    }

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

    function isTokenResellable() external view returns(bool){
        return isTokenResellable;
    }

}