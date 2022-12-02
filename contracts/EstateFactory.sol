// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "./Estate.sol";

contract EstateFactory {

    string public name = "Estate Factory";

    struct Estates{
        address payable operator;
        address estateContractAddress;
    }

    Estates[] public allEstates;
    mapping(string => bool) estateExists;

    event EstateCreated(
        uint indexed _tokenQuantity,
        uint _tokenPrice,
        uint _roi,
        uint _holdPeriodInYears,
        uint _minimumHoldPeriodInYears,
        uint _propertyValue,
        bool _isTokenResellable,
        string indexed _legalDocuments,
        string _propertyName,
        address _propertyOperator,
        address indexed _estateContract
    );

    error InsufficentCharacters(string str);

    function createEstate(
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
    ) external payable returns(address){
        require(!estateExists[_legalDocuments], "estate already exists");

        require(_tokenQuantity >= 100, "minimum 100 tokens required");
        require(_tokenPrice > 0, "invalid token price");
        require(_roi >= 4, "minimum 4% return");
        require(_holdPeriodInYears >= 3, "minimum 3 years hold period");
        require(_holdPeriodInYears > _minimumHoldPeriodInYears, "invalid minimum hold period, must be less than hold period");
        require(_minimumHoldPeriodInYears > 0, "invalid minimum hold period");
        require(_propertyValue > 0, "invalid property value");

        if(bytes(_legalDocuments).length < 3){
           revert InsufficentCharacters(_legalDocuments); 
        }

        if(bytes(_propertyName).length < 3){
           revert InsufficentCharacters(_propertyName); 
        }

        require(_propertyOperator != address(0));

        Estate estate = new Estate(
           _tokenQuantity,
           _tokenPrice,
           _roi,
           _holdPeriodInYears,
           _minimumHoldPeriodInYears,
           _propertyValue,
           _isTokenResellable,
           _legalDocuments,
           _propertyName,
           _propertyOperator            
        );

        address estateContract = address(estate);

        allEstates.push(Estates(_propertyOperator, estateContract));
        estateExists[_legalDocuments] = true;

        emit EstateCreated(
           _tokenQuantity,
           _tokenPrice,
           _roi,
            _holdPeriodInYears,
           _minimumHoldPeriodInYears,
           _propertyValue,
           _isTokenResellable,
           _legalDocuments,
           _propertyName,
           _propertyOperator,
           estateContract         
        );

        return address(estate);
    }

    function getNumberOfEstates() external view returns(uint) {
        return allEstates.length;
    }




}