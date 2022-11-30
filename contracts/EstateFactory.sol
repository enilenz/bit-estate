// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "./Estate.sol";

contract EstateFactory{
    mapping(address => address) estates;

    string public name = "Estate Factory";

    struct Estates{
        address payable operator;
        address estateContractAddress;
    }

    Estates[] public allEstates;

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
        address indexed _propertyOperator
    );

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
    ) external payable returns(uint){
        
        // Estate estate = new Estate();
        // estates[propertyOperator] = address(estate);

        // return address(estate);

    }





}