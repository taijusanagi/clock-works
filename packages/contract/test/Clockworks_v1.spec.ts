import * as chai from "chai";
import { solidity } from "ethereum-waffle";
import { network, ethers } from "hardhat";
import {
  ERC721_INTERFACE_ID,
  ERC721_METADATA_INTERFACE_ID,
  HAS_SECONRARY_SALE_FEES,
  NAME,
  SYMBOL,
  TOTAL_SUPPLY,
  TOKEN_URL_LIST,
  CID_LIST,
  SWITCH_TIME,
  MAX_SWITCH_COUNT,
  ROYALTY_RECIPIENTS,
  ROYALTY_BPS,
} from "../scripts/v1/a-clockwork-girl/constants";

chai.use(solidity);
const { expect } = chai;

const tokenId = 1;

const addOneDay = async () => {
  await network.provider.send("evm_increaseTime", [SWITCH_TIME]);
  await network.provider.send("evm_mine");
};

describe("Chocomold", function () {
  let signer, clockworksContract;

  this.beforeEach("initialization.", async function () {
    [signer] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("Clockworks_v1");
    clockworksContract = await Contract.deploy();
    await clockworksContract.initialize(
      NAME,
      SYMBOL,
      TOTAL_SUPPLY,
      SWITCH_TIME,
      MAX_SWITCH_COUNT,
      TOKEN_URL_LIST,
      ROYALTY_RECIPIENTS,
      ROYALTY_BPS
    );
  });
  it("deploy check", async function () {
    expect(await clockworksContract.name()).to.equal(NAME);
    expect(await clockworksContract.symbol()).to.equal(SYMBOL);
    expect(await clockworksContract.ownerOf(tokenId)).to.equal(signer.address);

    expect(await clockworksContract.totalSupply()).to.equal(TOTAL_SUPPLY);
    expect(await clockworksContract.switchTime()).to.equal(SWITCH_TIME);
    expect(await clockworksContract.maxSwitchCount()).to.equal(MAX_SWITCH_COUNT);

    const feeBps = await clockworksContract.getFeeBps(tokenId);
    const feeRecipients = await clockworksContract.getFeeRecipients(tokenId);

    for (let i = 0; i < ROYALTY_RECIPIENTS.length; i++) {
      expect(feeRecipients[i]).to.equal(ROYALTY_RECIPIENTS[i]);
      expect(feeBps[i]).to.equal(ROYALTY_BPS[i]);
    }

    expect(await clockworksContract.supportsInterface(ERC721_INTERFACE_ID)).to.equal(true);
    expect(await clockworksContract.supportsInterface(ERC721_METADATA_INTERFACE_ID)).to.equal(true);
    expect(await clockworksContract.supportsInterface(HAS_SECONRARY_SALE_FEES)).to.equal(true);
  });
  it("check token url", async function () {
    const max = 30;
    for (let i = 0; i <= max; i++) {
      // console.log(await clockworksContract.tokenURI(tokenId));
      expect(await clockworksContract.tokenURI(tokenId)).to.equal("ipfs://" + CID_LIST[i]);
      await addOneDay();
    }
    // just make sure after max growth, same metadata
    await addOneDay();
    // console.log(await clockworksContract.tokenURI(tokenId));
    expect(await clockworksContract.tokenURI(tokenId)).to.equal("ipfs://" + CID_LIST[max]);

    await clockworksContract.transferFrom(signer.address, signer.address, tokenId);
    // console.log(await clockworksContract.tokenURI(tokenId));
    expect(await clockworksContract.tokenURI(tokenId)).to.equal("ipfs://" + CID_LIST[0]);
  });
});
