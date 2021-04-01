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
  GROWTH_TIME,
  MAX_GORWTH_COUNT,
} from "../scripts/v1/a-clockwork-girl/constants";

chai.use(solidity);
const { expect } = chai;

const tokenId = 1;

const addOneDay = async () => {
  await network.provider.send("evm_increaseTime", [GROWTH_TIME]);
  await network.provider.send("evm_mine");
};

describe("Chocomold", function () {
  let signer, dollContract;

  this.beforeEach("initialization.", async function () {
    [signer] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("Clockworks_v1");
    dollContract = await Contract.deploy(NAME, SYMBOL, TOTAL_SUPPLY, GROWTH_TIME, MAX_GORWTH_COUNT, TOKEN_URL_LIST);
  });
  it("deploy check", async function () {
    expect(await dollContract.name()).to.equal(NAME);
    expect(await dollContract.symbol()).to.equal(SYMBOL);
    expect(await dollContract.ownerOf(tokenId)).to.equal(signer.address);
  });
  it("interface check", async function () {
    expect(await dollContract.supportsInterface(ERC721_INTERFACE_ID)).to.equal(true);
    expect(await dollContract.supportsInterface(ERC721_METADATA_INTERFACE_ID)).to.equal(true);
    // expect(await dollContract.supportsInterface(HAS_SECONRARY_SALE_FEES)).to.equal(true);
  });
  it("check token url", async function () {
    const max = 30;
    for (let i = 0; i <= max; i++) {
      expect(await dollContract.tokenURI(tokenId)).to.equal("ipfs://" + CID_LIST[i]);
      await addOneDay();
    }
    // just make sure after max growth, same metadata
    await addOneDay();
    expect(await dollContract.tokenURI(tokenId)).to.equal("ipfs://" + CID_LIST[max]);
  });
});
