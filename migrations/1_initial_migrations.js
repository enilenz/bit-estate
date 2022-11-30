var Estate = artifacts.require("Estate");
var EstateFactory = artifacts.require("EstateFactory");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Estate);
  await deployer.deploy(EstateFactory);

  const estateFactory = await EstateFactory.deployed();
  var name = await estateFactory.name();
 
  console.log("contract name" + name);


};