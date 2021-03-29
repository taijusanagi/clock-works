import { ethers } from "hardhat";

import { tokenURIs, GROWTH_TIME, MAX_GORWTH_COUNT } from "../helpers/constants";

const gasPrice = process.env.GAS_PRICE ? parseInt(process.env.GAS_PRICE) : 10000000000; //10 gwei

const main = async () => {
  const Contract = await ethers.getContractFactory("Cryptodoll");
  const contract = await Contract.deploy("Cryptodoll", "CD", GROWTH_TIME, MAX_GORWTH_COUNT, tokenURIs, {
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
