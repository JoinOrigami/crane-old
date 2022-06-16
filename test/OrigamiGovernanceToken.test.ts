import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers, upgrades } from "hardhat";

import type { OrigamiGovernanceToken } from "../src/types";

use(solidity);

describe("GovernanceToken", function () {
  let signers: SignerWithAddress[];
  let admin: SignerWithAddress;
  let owner: SignerWithAddress;
  let mintee: SignerWithAddress;
  let minter: SignerWithAddress;
  let transferrer: SignerWithAddress;

  before(async function () {
    signers = await ethers.getSigners();
    admin = signers[0];
    owner = signers[1];
    mintee = signers[2];
    minter = signers[3];
    transferrer = signers[3];
  });

  describe("Limited Supply", function () {
    let OGT: OrigamiGovernanceToken;

    beforeEach(async function () {
      const GTF__factory = await ethers.getContractFactory("OrigamiGovernanceToken");
      OGT = <OrigamiGovernanceToken>(
        await upgrades.deployProxy(GTF__factory, [owner.address, "Orange Token", "ORANGE", 10])
      );
      await OGT.connect(owner).grantRole(await OGT.MINTER_ROLE(), minter.address);
    });

    it("should revert mint when caller does not have proper role", async function () {
      await expect(OGT.connect(mintee).mint(mintee.address, 1)).to.be.revertedWith("AccessControl");
    });

    it("should mint when caller has proper role", async function () {
      await OGT.connect(minter).mint(mintee.address, 9);
      expect(await OGT.connect(mintee).balanceOf(mintee.address)).to.equal(9);
    });

    it("should revert when we attempt to mint more than the total supply's worth", async function () {
      await OGT.connect(minter).mint(mintee.address, 9);
      await expect(OGT.connect(minter).mint(mintee.address, 2)).to.be.revertedWith("ERC20Capped: cap exceeded");
    });
  });

  describe("Burning Tokens", function () {
    let OGT: OrigamiGovernanceToken;

    beforeEach(async function () {
      const GTF__factory = await ethers.getContractFactory("OrigamiGovernanceToken");
      OGT = <OrigamiGovernanceToken>(
        await upgrades.deployProxy(GTF__factory, [owner.address, "Orange Token", "ORANGE", 10])
      );
      await OGT.connect(owner).grantRole(await OGT.MINTER_ROLE(), minter.address);
    });

    it("reverts if non-admin tries to set enableBurn", async function () {
      await expect(OGT.connect(mintee).enableBurn()).to.be.revertedWith("AccessControl");
    });

    it("reverts if non-admin tries to set disableBurn", async function () {
      await expect(OGT.connect(mintee).disableBurn()).to.be.revertedWith("AccessControl");
    });

    it("allows admin to set enableBurn", async function () {
      await OGT.connect(owner).enableBurn();
      expect(await OGT.connect(mintee).burnable()).to.be.true;
    });

    it("allows admin to set disableBurn", async function () {
      // can only set disable from enabled, so set that first
      await OGT.connect(owner).enableBurn();
      // now set disable
      await OGT.connect(owner).disableBurn();
      expect(await OGT.burnable()).to.be.false;
    });

    it("prevents burning when not enabled", async function () {
      await expect(OGT.connect(owner).burn(1)).to.be.revertedWith("Burnable: burning is disabled");
    });

    it("prevents calling enableBurn when already enabled", async function () {
      await OGT.connect(owner).enableBurn();
      await expect(OGT.connect(owner).enableBurn()).to.be.revertedWith("Burnable: burning is enabled");
    });

    it("allows burning when enabled", async function () {
      await OGT.connect(minter).mint(admin.address, 2);
      await OGT.connect(owner).enableBurn();
      await OGT.connect(admin).burn(1);
      expect(await OGT.connect(mintee).balanceOf(admin.address)).to.equal(1);
    });

    it("allows burning from a wallet we have an allowance for when burning is enabled", async function () {
      await OGT.connect(minter).mint(mintee.address, 2);
      await OGT.connect(mintee).approve(admin.address, 1);
      await OGT.connect(owner).enableBurn();
      await OGT.connect(admin).burnFrom(mintee.address, 1);
      expect(await OGT.balanceOf(mintee.address)).to.equal(1);
    });

    it("prevents burning more than allowed from a wallet we have an allowance for when burning is enabled", async function () {
      await OGT.connect(minter).mint(mintee.address, 3);
      await OGT.connect(mintee).approve(admin.address, 1);
      await OGT.connect(owner).enableBurn();
      await expect(OGT.connect(admin).burnFrom(mintee.address, 2)).to.be.revertedWith("ERC20: insufficient allowance");
    });
  });

  describe("Pausing", function () {
    let OGT: OrigamiGovernanceToken;

    beforeEach(async function () {
      const GTF__factory = await ethers.getContractFactory("OrigamiGovernanceToken");
      OGT = <OrigamiGovernanceToken>(
        await upgrades.deployProxy(GTF__factory, [owner.address, "Orange Token", "ORANGE", 10])
      );
      await OGT.connect(owner).grantRole(await OGT.MINTER_ROLE(), minter.address);
    });

    it("only allows PAUSER to set pause", async function () {
      await expect(OGT.connect(mintee).pause()).to.be.revertedWith("AccessControl");
      await OGT.connect(owner).pause();
      expect(await OGT.paused()).to.be.true;
    });

    it("only allows PAUSER to set unpause", async function () {
      await OGT.connect(owner).pause();
      await expect(OGT.connect(mintee).unpause()).to.be.revertedWith("AccessControl");
      await OGT.connect(owner).unpause();
      expect(await OGT.paused()).to.be.false;
    });

    it("prevents minting when paused", async function () {
      await OGT.connect(owner).pause();
      await expect(OGT.connect(minter).mint(mintee.address, 1)).to.be.revertedWith("Pausable: paused");
    });

    it("prevents burning when paused", async function () {
      await OGT.connect(minter).mint(owner.address, 10);
      await OGT.connect(owner).pause();
      await expect(OGT.connect(owner).burn(1)).to.be.revertedWith("Pausable: paused");
    });

    it("prevents transfers when paused", async function () {
      await OGT.connect(minter).mint(owner.address, 10);
      await OGT.connect(owner).pause();
      await OGT.connect(owner).enableTransfer();
      await expect(OGT.connect(owner).transfer(mintee.address, 1)).to.be.revertedWith("Pausable: paused");
    });

    it("prevents TRANSFERRER_ROLE transfers when paused", async function () {
      await OGT.connect(minter).mint(transferrer.address, 10);
      await OGT.connect(owner).pause();
      await OGT.connect(owner).enableTransfer();
      await expect(OGT.connect(transferrer).transfer(mintee.address, 1)).to.be.revertedWith("Pausable: paused");
    });

    it("allows burning when unpaused and burnable", async function () {
      expect(await OGT.paused()).to.be.false;
      await OGT.connect(owner).enableBurn();
      await OGT.connect(minter).mint(admin.address, 2);
      await expect(OGT.connect(admin).burn(1)).to.not.be.reverted;
    });

    it("allows minting when unpaused", async function () {
      expect(await OGT.paused()).to.be.false;
      await OGT.connect(minter).mint(admin.address, 1);
      expect(await OGT.balanceOf(admin.address)).to.equal(1);
    });

    it("allows transfers when unpaused", async function () {
      expect(await OGT.paused()).to.be.false;
      await OGT.connect(owner).enableTransfer();
      await OGT.connect(minter).mint(admin.address, 1);
      await OGT.connect(admin).transfer(mintee.address, 1);
      expect(await OGT.balanceOf(mintee.address)).to.equal(1);
    });
  });

  describe("Transferrability", function () {
    let OGT: OrigamiGovernanceToken;

    beforeEach(async function () {
      const GTF__factory = await ethers.getContractFactory("OrigamiGovernanceToken");
      OGT = <OrigamiGovernanceToken>(
        await upgrades.deployProxy(GTF__factory, [owner.address, "Orange Token", "ORANGE", 10])
      );
      await OGT.connect(owner).grantRole(await OGT.MINTER_ROLE(), minter.address);
      await OGT.connect(owner).grantRole(await OGT.TRANSFERRER_ROLE(), transferrer.address);
    });

    it("only allows admin to set transferrable", async function () {
      await expect(OGT.connect(mintee).enableTransfer()).to.be.revertedWith("AccessControl");
      await OGT.connect(owner).enableTransfer();
      expect(await OGT.transferrable()).to.be.true;
    });

    it("only allows admin to set nontransferrable", async function () {
      // can only set nontransferrable from transferrable, so set that first
      await OGT.connect(owner).enableTransfer();
      // now set nontransferrable
      await expect(OGT.connect(mintee).disableTransfer()).to.be.revertedWith("AccessControl");
      await OGT.connect(owner).disableTransfer();
      expect(await OGT.transferrable()).to.be.false;
    });

    it("prevents calling enableTransfer when already enabled", async function () {
      await OGT.connect(owner).enableTransfer();
      await expect(OGT.connect(owner).enableTransfer()).to.be.revertedWith("Transferrable: transfers are enabled");
    });

    it("allows mint when transfer is disabled", async function () {
      expect(await OGT.transferrable()).to.be.false;
      await OGT.connect(minter).mint(admin.address, 1);
      expect(await OGT.balanceOf(admin.address)).to.equal(1);
    });

    it("prevents burn when transfer is disabled", async function () {
      expect(await OGT.transferrable()).to.be.false;
      await expect(OGT.connect(owner).burn(1)).to.be.revertedWith("Burnable: burning is disabled");
    });

    it("prevents (non-MINTER) transfers when transfer is disabled", async function () {
      expect(await OGT.transferrable()).to.be.false;
      await OGT.connect(minter).mint(mintee.address, 1);
      await expect(OGT.connect(mintee).transfer(admin.address, 1)).to.be.revertedWith(
        "Transferrable: transfers are disabled",
      );
      await expect(OGT.connect(mintee).transferFrom(mintee.address, admin.address, 1)).to.be.revertedWith(
        "Transferrable: transfers are disabled",
      );
    });

    it("allows transfers when transfer is enabled", async function () {
      expect(await OGT.transferrable()).to.be.false;
      await OGT.connect(owner).enableTransfer();
      await OGT.connect(minter).mint(mintee.address, 3);
      await OGT.connect(mintee).transfer(admin.address, 1);
      expect(await OGT.balanceOf(mintee.address)).to.equal(2);
      await OGT.connect(mintee).approve(admin.address, 1);
      await OGT.connect(admin).transferFrom(mintee.address, admin.address, 1);
      expect(await OGT.balanceOf(mintee.address)).to.equal(1);
      expect(await OGT.balanceOf(admin.address)).to.equal(2);
    });

    it("allows TRANSFERRER_ROLE to transfer when transfer is disabled", async function () {
      expect(await OGT.transferrable()).to.be.false;
      await OGT.connect(minter).mint(transferrer.address, 10);
      await OGT.connect(transferrer).transfer(admin.address, 5);
      expect(await OGT.balanceOf(admin.address)).to.equal(5);
      expect(await OGT.balanceOf(transferrer.address)).to.equal(5);
    });

    it("allows TRANSFERRER_ROLE to transfer when transfer is enabled", async function () {
      expect(await OGT.transferrable()).to.be.false;
      await OGT.connect(owner).enableTransfer();
      expect(await OGT.transferrable()).to.be.true;
      await OGT.connect(minter).mint(transferrer.address, 10);
      await OGT.connect(transferrer).transfer(admin.address, 5);
      expect(await OGT.balanceOf(admin.address)).to.equal(5);
      expect(await OGT.balanceOf(transferrer.address)).to.equal(5);
    });
  });
});
