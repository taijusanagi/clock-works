import { ethers } from "hardhat";

import { NAME, SYMBOL, TOKEN_URL_LIST, GROWTH_TIME, MAX_GORWTH_COUNT } from "./constants";

const gasPrice = process.env.GAS_PRICE ? parseInt(process.env.GAS_PRICE) : 10000000000; //10 gwei

const main = async () => {
  const Contract = await ethers.getContractFactory("Clockworks_v1");
  const contract = await Contract.deploy(NAME, SYMBOL, GROWTH_TIME, MAX_GORWTH_COUNT, TOKEN_URL_LIST, {
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
