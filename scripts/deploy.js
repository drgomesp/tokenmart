/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const {config, ethers, tenderly, run} = require("hardhat");
const {utils} = require("ethers");
const R = require("ramda");

async function main() {
  const contractName = "NFTMinter";
  const NFTMinter = await ethers.getContractFactory(contractName);
  const minter = await NFTMinter.deploy();

  const deployed = await minter.deployed();
  const gasUsed = deployed.deployTransaction.gasLimit.mul(deployed.deployTransaction.gasPrice)
  const extraGasInfo = `${ethers.utils.formatEther(gasUsed)} ETH, tx hash ${deployed.deployTransaction.hash}`;

  console.log(" 📄", contractName, "deployed to:", deployed.address);
  console.log(" ⛽", extraGasInfo);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
