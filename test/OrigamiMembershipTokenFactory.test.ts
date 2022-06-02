import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers, upgrades } from "hardhat";

import type { TransparentUpgradeableProxy, TransparentUpgradeableProxy__factory } from "../src/types";
import type {
  OrigamiMembershipToken,
  OrigamiMembershipTokenFactory,
  OrigamiMembershipTokenTestVersion,
  OrigamiMembershipTokenTestVersion__factory,
} from "../src/types";

use(solidity);

describe("OrigamiMembershipTokenFactory", function () {
  let signers: SignerWithAddress[];
  let owner: SignerWithAddress;
  let mintee: SignerWithAddress;
  let minter: SignerWithAddress;

  before(async function () {
    signers = await ethers.getSigners();
    owner = signers[1];
    mintee = signers[2];
    minter = signers[3];
  });

  describe("Deploying", function () {
    let OMF: OrigamiMembershipTokenFactory;
    let aDao: OrigamiMembershipToken;
    let bDao: OrigamiMembershipToken;

    beforeEach(async function () {
      const OMF__factory = await ethers.getContractFactory("OrigamiMembershipTokenFactory");
      const OMT__factory = await ethers.getContractFactory("OrigamiMembershipToken");
      OMF = <OrigamiMembershipTokenFactory>await upgrades.deployProxy(OMF__factory, []);

      const aDaoTx = await OMF.createOrigamiMembershipToken(
        owner.address,
        "Astronaut DAO Membership",
        "ADM",
        "ipfs://astronaut.dao/",
      );
      await aDaoTx.wait();
      const aDaoAddress = await OMF.getProxyContractAddress(0);
      aDao = <OrigamiMembershipToken>await OMT__factory.attach(aDaoAddress as string);

      const bDaoTx = await OMF.createOrigamiMembershipToken(
        owner.address,
        "BBQ DAO Membership",
        "BBQ",
        "https://ipfs.io/wtfbbq/",
      );
      await bDaoTx.wait();
      const bDaoAddress = await OMF.getProxyContractAddress(1);
      bDao = <OrigamiMembershipToken>await OMT__factory.attach(bDaoAddress as string);
    });

    it("Created the ADM token", async function () {
      await aDao.connect(owner).safeMint(mintee.address);
      expect(await aDao.connect(mintee).name()).to.equal("Astronaut DAO Membership");
      expect(await aDao.connect(mintee).symbol()).to.equal("ADM");
      expect(await aDao.connect(mintee).tokenURI(1)).to.equal("ipfs://astronaut.dao/1");
      expect(await aDao.connect(mintee).balanceOf(mintee.address)).to.equal(1);
      expect(await aDao.connect(mintee).balanceOf(minter.address)).to.equal(0);
    });

    it("Created the BBQ token", async function () {
      await bDao.connect(owner).safeMint(mintee.address);
      expect(await bDao.connect(mintee).name()).to.equal("BBQ DAO Membership");
      expect(await bDao.connect(mintee).symbol()).to.equal("BBQ");
      expect(await bDao.connect(mintee).tokenURI(1)).to.equal("https://ipfs.io/wtfbbq/1");
      expect(await bDao.connect(mintee).balanceOf(mintee.address)).to.equal(1);
      expect(await bDao.connect(mintee).balanceOf(minter.address)).to.equal(0);
    });
  });

  describe("AccessControl for deployed instances", function () {
    let OMF: OrigamiMembershipTokenFactory;
    let aDao: OrigamiMembershipToken;

    beforeEach(async function () {
      const OMF__factory = await ethers.getContractFactory("OrigamiMembershipTokenFactory");
      const OMT__factory = await ethers.getContractFactory("OrigamiMembershipToken");
      OMF = <OrigamiMembershipTokenFactory>await upgrades.deployProxy(OMF__factory, []);

      const aDaoTx = await OMF.createOrigamiMembershipToken(
        owner.address,
        "Astronaut DAO Membership",
        "ADM",
        "ipfs://astronaut.dao/",
      );
      await aDaoTx.wait();
      const aDaoAddress = await OMF.getProxyContractAddress(0);
      aDao = <OrigamiMembershipToken>await OMT__factory.attach(aDaoAddress as string);
    });

    it("allows admin to grant roles", async function () {
      const minterRole = await aDao.connect(owner).MINTER_ROLE();
      await aDao.connect(owner).grantRole(minterRole, minter.address);
      expect(await aDao.connect(owner).hasRole(minterRole, minter.address)).to.be.true;
    });
  });

  describe("Upgrading", function () {
    let OMF: OrigamiMembershipTokenFactory;
    let aDao: OrigamiMembershipTokenTestVersion;
    let bDao: OrigamiMembershipTokenTestVersion;
    let OMTV: OrigamiMembershipTokenTestVersion;
    let OMTV__factory: OrigamiMembershipTokenTestVersion__factory;
    let TokenProxy__factory: TransparentUpgradeableProxy__factory;

    before(async function () {
      const OMF__factory = await ethers.getContractFactory("OrigamiMembershipTokenFactory");
      TokenProxy__factory = await ethers.getContractFactory("TransparentUpgradeableProxy");
      OMTV__factory = await ethers.getContractFactory("OrigamiMembershipTokenTestVersion");

      OMF = <OrigamiMembershipTokenFactory>await upgrades.deployProxy(OMF__factory, []);
      const aDaoTx = await OMF.createOrigamiMembershipToken(
        owner.address,
        "Astronaut DAO Membership",
        "ADM",
        "ipfs://astronaut.dao/",
      );
      await aDaoTx.wait();
      const aDaoAddress = await OMF.getProxyContractAddress(0);

      OMTV = await OMTV__factory.deploy();

      // this only upgrades this specific proxy's implementation
      const tokenProxy = <TransparentUpgradeableProxy>TokenProxy__factory.attach(aDaoAddress);
      await tokenProxy.upgradeTo(OMTV.address);

      aDao = <OrigamiMembershipTokenTestVersion>await OMTV__factory.attach(aDaoAddress);

      // this still generates proxies with the old implementation, since the factory hasn't been upgraded
      const bDaoTx = await OMF.createOrigamiMembershipToken(
        owner.address,
        "BBQ DAO Membership",
        "BBQ",
        "https://ipfs.io/wtfbbq/",
      );
      await bDaoTx.wait();
      const bDaoAddress = await OMF.getProxyContractAddress(1);

      bDao = <OrigamiMembershipTokenTestVersion>await OMTV__factory.attach(bDaoAddress);
    });

    it("reverts when you try to access a proxy that does not exist", async function () {
      expect(await OMF.getProxyContractAddress(0)).to.equal(aDao.address);
      await expect(OMF.getProxyContractAddress(2)).to.be.reverted;
    });

    it("reverts when a non-admin attempts to retrieve proxy addresses", async function () {
      await expect(OMF.connect(mintee).getProxyContractAddress(0)).to.be.reverted;
    });

    it("has access to the old functions", async function () {
      expect(await aDao.connect(mintee).name()).to.equal("Astronaut DAO Membership");
    });

    it("reflects changes in the upgraded contract", async function () {
      expect(await aDao.connect(mintee).isFromUpgrade()).to.be.true;
    });

    it("new factory instances of the proxy have to be upgraded independently", async function () {
      expect(await bDao.connect(mintee).name()).to.equal("BBQ DAO Membership");
      await expect(bDao.connect(mintee).isFromUpgrade()).to.be.reverted;

      const okcProxy = <TransparentUpgradeableProxy>TokenProxy__factory.attach(bDao.address);
      await okcProxy.upgradeTo(OMTV.address);
      expect(await bDao.connect(mintee).isFromUpgrade()).to.be.true;
    });
  });
});
