import { ethers } from "hardhat";

import {
  NAME,
  SYMBOL,
  TOTAL_SUPPLY,
  TOKEN_URL_LIST,
  CID_LIST,
  SWITCH_TIME,
  MAX_SWITCH_COUNT,
  ROYALTY_RECIPIENTS,
  ROYALTY_BPS,
} from "./constants";

const gasPrice = process.env.GAS_PRICE ? parseInt(process.env.GAS_PRICE) : 10000000000; //10 gwei

const main = async () => {
  const Contract = await ethers.getContractFactory("Clockworks_v1");
  const contract = await Contract.deploy({
    gasPrice,
  });
  console.log("deployed at", contract.address);
  await contract.initialize(
    NAME,
    SYMBOL,
    TOTAL_SUPPLY,
    SWITCH_TIME,
    MAX_SWITCH_COUNT,
    TOKEN_URL_LIST,
    ROYALTY_RECIPIENTS,
    ROYALTY_BPS
  );
  console.log("initialized.");
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
