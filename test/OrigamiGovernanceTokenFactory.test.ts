import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers, upgrades } from "hardhat";

import type { OrigamiGovernanceToken } from "../src/types";
import type { OrigamiGovernanceTokenFactory } from "../src/types";

use(solidity);

describe("OrigamiGovernanceTokenFactory", function () {
  let signers: SignerWithAddress[];
  let admin: SignerWithAddress;
  let mintee: SignerWithAddress;

  before(async function () {
    signers = await ethers.getSigners();
    admin = signers[0];
    mintee = signers[1];
  });

  describe("Deploying", function () {
    let OGTF: OrigamiGovernanceTokenFactory;
    let KidA: OrigamiGovernanceToken;
    let OkC: OrigamiGovernanceToken;

    beforeEach(async function () {
      const OGTF__factory = await ethers.getContractFactory("OrigamiGovernanceTokenFactory");
      const OGT__factory = await ethers.getContractFactory("OrigamiGovernanceToken");
      OGTF = <OrigamiGovernanceTokenFactory>await upgrades.deployProxy(OGTF__factory, []);
      const KidAtx = await OGTF.createOrigamiGovernanceToken("Kid A", "KIDA", 10);
      await KidAtx.wait();
      const KidAAddress = await OGTF.getClonedContractAddress(0);
      KidA = <OrigamiGovernanceToken>await OGT__factory.attach(KidAAddress as string);
      const OkCtx = await OGTF.createOrigamiGovernanceToken("Okay Computer", "OKC", 100);
      await OkCtx.wait();
      const OkCAddress = await OGTF.getClonedContractAddress(1);
      OkC = <OrigamiGovernanceToken>await OGT__factory.attach(OkCAddress as string);
    });

    it("Created the KIDA token", async function () {
      expect(await KidA.name()).to.equal("Kid A");
      expect(await KidA.symbol()).to.equal("KIDA");
      expect(await KidA.decimals()).to.equal(18);
      expect(await KidA.cap()).to.equal(10);
      expect(await KidA.balanceOf(mintee.address)).to.equal(0);
      expect(await KidA.balanceOf(admin.address)).to.equal(0);
    });

    it("Created the OKC token", async function () {
      expect(await OkC.name()).to.equal("Okay Computer");
      expect(await OkC.symbol()).to.equal("OKC");
      expect(await OkC.decimals()).to.equal(18);
      expect(await OkC.cap()).to.equal(100);
      expect(await OkC.balanceOf(mintee.address)).to.equal(0);
      expect(await OkC.balanceOf(admin.address)).to.equal(0);
    });
  });

  describe("Upgrading the implementation for clones", function () {
    it("reflects changes in the upgraded contract");
  });
});
