import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers, upgrades } from "hardhat";

import type { TransparentUpgradeableProxy, TransparentUpgradeableProxy__factory } from "../src/types";
import type {
  OrigamiGovernanceToken,
  OrigamiGovernanceTokenFactory,
  OrigamiGovernanceTokenTestVersion,
  OrigamiGovernanceTokenTestVersion__factory,
} from "../src/types";

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
    let OGTF: OrigamiGovernanceTokenFactory;
    let KidA: OrigamiGovernanceTokenTestVersion;
    let OkC: OrigamiGovernanceTokenTestVersion;
    let OGTTV: OrigamiGovernanceTokenTestVersion;
    let OGTTV__factory: OrigamiGovernanceTokenTestVersion__factory;
    let TokenProxy__factory: TransparentUpgradeableProxy__factory;

    before(async function () {
      const OGTF__factory = await ethers.getContractFactory("OrigamiGovernanceTokenFactory");
      TokenProxy__factory = await ethers.getContractFactory("TransparentUpgradeableProxy");
      OGTTV__factory = await ethers.getContractFactory("OrigamiGovernanceTokenTestVersion");

      OGTF = <OrigamiGovernanceTokenFactory>await upgrades.deployProxy(OGTF__factory, []);
      const KidAtx = await OGTF.createOrigamiGovernanceToken("Kid A", "KIDA", 10);
      await KidAtx.wait();
      const KidAAddress = await OGTF.getProxyContractAddress(0);

      OGTTV = await OGTTV__factory.deploy();

      // this only upgrades this specific proxy's implementation
      const tokenProxy = <TransparentUpgradeableProxy>TokenProxy__factory.attach(KidAAddress);
      await tokenProxy.upgradeTo(OGTTV.address);

      KidA = <OrigamiGovernanceTokenTestVersion>await OGTTV__factory.attach(KidAAddress);

      // this still generates proxies with the old implementation, since the factory hasn't been upgraded
      const OkCtx = await OGTF.createOrigamiGovernanceToken("Okay Computer", "OKC", 10);
      await OkCtx.wait();
      const OkCAddress = await OGTF.getProxyContractAddress(1);

      OkC = <OrigamiGovernanceTokenTestVersion>await OGTTV__factory.attach(OkCAddress);
    });

    it("has access to the old functions", async function () {
      expect(await KidA.connect(mintee).name()).to.equal("Kid A");
      expect(await KidA.connect(mintee).cap()).to.equal(10);
    });

    it("reflects changes in the upgraded contract", async function () {
      expect(await KidA.connect(mintee).isFromUpgrade()).to.be.true;
    });

    it("new factory instances of the proxy have to be upgraded independently", async function () {
      expect(await OkC.connect(mintee).name()).to.equal("Okay Computer");
      await expect(OkC.connect(mintee).isFromUpgrade()).to.be.reverted;

      const okcProxy = <TransparentUpgradeableProxy>TokenProxy__factory.attach(OkC.address);
      await okcProxy.upgradeTo(OGTTV.address);
      expect(await OkC.connect(mintee).isFromUpgrade()).to.be.true;
    });
  });
});
