import { ethers } from "hardhat";

const gasPrice = process.env.GAS_PRICE ? parseInt(process.env.GAS_PRICE) : 10000000000; //10 gwei

const main = async () => {
  const contractName = "Cryptodolls";
  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy({
    gasPrice,
  });
  console.log("deployed at", contract.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
