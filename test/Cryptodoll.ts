import * as chai from "chai";
import { solidity } from "ethereum-waffle";
import { network, ethers } from "hardhat";
import {
  ERC721_INTERFACE_ID,
  ERC721_METADATA_INTERFACE_ID,
  HAS_SECONRARY_SALE_FEES,
  tokenURIs,
  cids,
  TIMESTAMP_DAY,
} from "../helpers/constants";

chai.use(solidity);
const { expect } = chai;

const tokenId = 1;
const name = "name";
const symbol = "symbol";

const addOneDay = async () => {
  await network.provider.send("evm_increaseTime", [TIMESTAMP_DAY]);
  await network.provider.send("evm_mine");
};

describe("Chocomold", function () {
  let signer, dollContract;

  this.beforeEach("initialization.", async function () {
    [signer] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("Cryptodoll");
    dollContract = await Contract.deploy(name, symbol, tokenURIs);
  });
  it("deploy check", async function () {
    expect(await dollContract.name()).to.equal(name);
    expect(await dollContract.symbol()).to.equal(symbol);
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
      console.log("i", i);
      expect(await dollContract.tokenURI(tokenId)).to.equal("ipfs://" + cids[i]);
      await addOneDay();
    }
    // just make sure after max growth, same metadata
    await addOneDay();
    expect(await dollContract.tokenURI(tokenId)).to.equal("ipfs://" + cids[max]);
  });
});
