const CrowdfundingFactory = artifacts.require("CrowdfundingFactory");
const Governance = artifacts.require("Governance");

module.exports = async function (deployer, network, accounts) {
  // Deploy Factory
  await deployer.deploy(CrowdfundingFactory);
  const factoryInstance = await CrowdfundingFactory.deployed();
  
  // Deploy Governance
  await deployer.deploy(Governance);
  const governanceInstance = await Governance.deployed();
  
  console.log("CrowdfundingFactory deployed at:", factoryInstance.address);
  console.log("Governance deployed at:", governanceInstance.address);
  
  // Save addresses to a file for frontend use
  const fs = require('fs');
  const contractAddresses = {
    CrowdfundingFactory: factoryInstance.address,
    Governance: governanceInstance.address,
    network: network,
    deployedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(
    './frontend/src/contracts/addresses.json',
    JSON.stringify(contractAddresses, null, 2)
  );
};
