import * as chai from "chai";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import { ERC721_INTERFACE_ID, ERC721_METADATA_INTERFACE_ID, HAS_SECONRARY_SALE_FEES } from "../helpers/constants";

chai.use(solidity);
const { expect } = chai;

const tokenId = 1;

describe("Chocomold", function () {
  let signer, dollContract;

  this.beforeEach("initialization.", async function () {
    [signer] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("Cryptodoll");
    dollContract = await Contract.deploy();
  });
  it("interface check", async function () {
    expect(await dollContract.supportsInterface(ERC721_INTERFACE_ID)).to.equal(true);
    expect(await dollContract.supportsInterface(ERC721_METADATA_INTERFACE_ID)).to.equal(true);
    expect(await dollContract.supportsInterface(HAS_SECONRARY_SALE_FEES)).to.equal(true);
  });
  it("get no royality when no default, no custom", async function () {
    // await moldContract["mint(address,uint256)"](signer.address, tokenId);
    // const feeRecipientsResult = await moldContract.getFeeRecipients(tokenId);
    // const feeBps = await moldContract.getFeeBps(tokenId);
    // expect(feeRecipientsResult.length).to.equal(0);
    // expect(feeBps.length).to.equal(0);
  });
});
