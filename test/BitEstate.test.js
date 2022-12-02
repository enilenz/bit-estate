const { time } = require('@openzeppelin/test-helpers'); 
const { expect } = require('chai');

const Estate = artifacts.require("Estate");
const EstateFactory = artifacts.require("EstateFactory");

function tokens(n){
    return web3.utils.toWei(n, 'ether');
}

contract("BitEstate", async(accounts) => {
    let estateFactory, operator1, operator2;
    let estate, estateAddress;

    before(async() => {
         estateFactory = await EstateFactory.deployed();
         estateFactoryAddress = estateFactory.address;
         operator1 = accounts[1];
         operator2 = accounts[2];

         estate = await Estate.deployed(); 
         estateAddress = estate.address;  

         let startTime = (await time.latest());
         let endTime = (await time.latest()).add(time.duration.seconds(5));

         console.log("start time", startTime.toString());
         console.log("end time", endTime.toString());

    });

    describe("contract deployment", async() => {
        it("should ensure name is correct", async() => {
            const name = await estateFactory.name();
            assert.equal(name, "Estate Factory");
        });

        it("should ensure number of created estates is zero",  async() => {
            const number = await estateFactory.getNumberOfEstates();
            assert.equal(number, 0);
        });

        it("should ensure name is correct", async() => {
            const name = await estate.name();
            assert.equal(name, "Estate");
        });

        it("should check address of operator", async() => {
            const acc = await estate.getOperator.call();
            assert.equal(operator1, acc);
        });

    });

    describe("Estate Factory", async() => {
        let newEstate;

        before( async () =>{
            newEstate = await estateFactory.createEstate(100, 1, 4, 5, 2, 100, true, "legal documents", "property name", operator2);
        });

        it("should create a new estate", async() => {
            let events = newEstate.logs[0].args;

            assert.equal(100, events._tokenQuantity.toString());
            assert.equal(1, events._tokenPrice.toString());
            assert.equal(4, events._roi.toString());
            assert.equal(5, events._holdPeriodInYears.toString());
            assert.equal(2, events._minimumHoldPeriodInYears.toString());
            assert.equal(100, events._propertyValue.toString());
            assert.equal(true, events._isTokenResellable);
            assert.equal("property name", events._propertyName.toString());
            assert.equal(operator2, events._propertyOperator.toString());

        });

        it("should ensure number of created estates is one",  async() => {
            const number = await estateFactory.getNumberOfEstates();
            assert.equal(number, 1);
        });
    });

    describe("Estate",  async() => {
        it("should buy token", async() => {

        });
    });

    

});