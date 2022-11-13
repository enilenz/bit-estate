var BitFactory = artifacts.require("BitFactory");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(BitFactory);

  const bit = await BitFactory.deployed();
  var name = await bit.name();
 
  console.log("contract name" + name);


};