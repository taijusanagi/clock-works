import { ethers } from "hardhat";

import {
  OWNER,
  NAME,
  SYMBOL,
  TOTAL_SUPPLY,
  TOKEN_URL_LIST,
  SWITCH_TIME,
  MAX_SWITCH_COUNT,
  ROYALTY_RECIPIENTS,
  ROYALTY_BPS,
} from "./constants";

const gasPrice = process.env.GAS_PRICE ? parseInt(process.env.GAS_PRICE) : 111000000000; //100 gwei

const main = async () => {
  // const Contract = await ethers.getContractFactory("Clockworks_v1");
  // const contract = await Contract.deploy({
  //   gasPrice,
  // });
  // console.log("deployed at", contract.address);
  const contract = await ethers.getContractAt("Clockworks_v1", "0xc9b087f7f5d4d00478bb736b9a47bf7927976bca");
  console.log(contract);
  await contract.initialize(
    OWNER,
    NAME,
    SYMBOL,
    TOTAL_SUPPLY,
    SWITCH_TIME,
    MAX_SWITCH_COUNT,
    TOKEN_URL_LIST,
    ROYALTY_RECIPIENTS,
    ROYALTY_BPS,
    {
      gasPrice,
    }
  );
  console.log("initialized.");
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
