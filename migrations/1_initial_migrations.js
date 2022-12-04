var EstateFactory = artifacts.require("EstateFactory");
 var Estate = artifacts.require("Estate");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(EstateFactory);
  await deployer.deploy(Estate, 100, 1, 4, 5, 2, 100, true, "https://ipfs.io/ipfs/QmYxnP59ccW4iseBzHK1VohjzFR65rGSy6h4HtFKJ66xA7", "property name", accounts[1]);

  const estateFactory = await EstateFactory.deployed();
  var name = await estateFactory.name();
  console.log("contract name: " + name);


};