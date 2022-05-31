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
      const KidAAddress = await OGTF.getProxyContractAddress(0);
      KidA = <OrigamiGovernanceToken>await OGT__factory.attach(KidAAddress as string);
      const OkCtx = await OGTF.createOrigamiGovernanceToken("Okay Computer", "OKC", 100);
      await OkCtx.wait();
      const OkCAddress = await OGTF.getProxyContractAddress(1);
      OkC = <OrigamiGovernanceToken>await OGT__factory.attach(OkCAddress as string);
    });

    it("Created the KIDA token", async function () {
      expect(await KidA.connect(mintee).name()).to.equal("Kid A");
      expect(await KidA.connect(mintee).symbol()).to.equal("KIDA");
      expect(await KidA.connect(mintee).decimals()).to.equal(18);
      expect(await KidA.connect(mintee).cap()).to.equal(10);
      expect(await KidA.connect(mintee).balanceOf(mintee.address)).to.equal(0);
      expect(await KidA.connect(mintee).balanceOf(admin.address)).to.equal(0);
    });

    it("Created the OKC token", async function () {
      expect(await OkC.connect(mintee).name()).to.equal("Okay Computer");
      expect(await OkC.connect(mintee).symbol()).to.equal("OKC");
      expect(await OkC.connect(mintee).decimals()).to.equal(18);
      expect(await OkC.connect(mintee).cap()).to.equal(100);
      expect(await OkC.connect(mintee).balanceOf(mintee.address)).to.equal(0);
      expect(await OkC.connect(mintee).balanceOf(admin.address)).to.equal(0);
    });
  });

  describe("Upgrading the implementation for clones", function () {
    it("reflects changes in the upgraded contract");
  });
});
