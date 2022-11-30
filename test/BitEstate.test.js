const Estate = artifacts.require("Estate");
const EstateFactory = artifacts.require("EstateFactory");

function tokens(n){
    return web3.utils.toWei(n, 'ether');
}

//1000000000000000000000

contract("BitEstate", async(accounts) => {
    let estateFactory, estateFactoryAddress, operator1, operator2, operator3, operator4;
    let trf1, trf2, trf1Addr, trf2Addr, approvalResult1, approvalResult2;
    let nft1, nft2, nft1Addr, nft2Addr;

    before(async() => {
         estateFactory = await EstateFactory.deployed();
         estateFactoryAddress = estateFactory.address;
         operator1 = accounts[1];
         operator2 = accounts[2];
         operator3 = accounts[3];
         operator4 = accounts[4];

    });

    describe("contract deployment", async() => {
        it("should return addresses of participants", async() => {
            const benefactorAddr = await trustFund.getBenefactor();
            const spenderAddr = await trustFund.getSpender();
            assert.equal(benefactor, benefactorAddr);
            assert.equal(spender, spenderAddr);
        });

        it("should ensure lockDuration is non zero",  async() => {
            const lock = await trustFund.lockDuration();
            assert.notEqual(lock, 0);
        })

        it("should ensure eth sent on contract deployment", async() => {
            const balance  = await web3.eth.getBalance(trustFundAddress);
            assert.notEqual(balance, 0);
        })
    });

 

    


});