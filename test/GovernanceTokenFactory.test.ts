import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers, upgrades } from "hardhat";

import type { GovernanceTokenFactory } from "../src/types";

use(solidity);

describe("Unit tests", function () {
  let signers: SignerWithAddress[];
  let admin: SignerWithAddress;
  let mintee: SignerWithAddress;

  before(async function () {
    signers = await ethers.getSigners();
    admin = signers[0];
    mintee = signers[1];
  });

  describe("Limited Supply", function () {
    let GTF: GovernanceTokenFactory;

    beforeEach(async function () {
      const GTF__factory = await ethers.getContractFactory("GovernanceTokenFactory");
      GTF = <GovernanceTokenFactory>await upgrades.deployProxy(GTF__factory, ["Orange Token", "ORANGE", 10]);
    });

    it("should revert mint when caller does not have proper role", async function () {
      await expect(GTF.connect(mintee).mint(mintee.address, 1)).to.be.revertedWith("AccessControl");
    });

    it("should mint when caller has proper role", async function () {
      await GTF.mint(mintee.address, 9);
      expect(await GTF.connect(mintee).balanceOf(mintee.address)).to.equal(9);
    });

    it("should revert when we attempt to mint more than the total supply's worth", async function () {
      await GTF.mint(mintee.address, 9);
      await expect(GTF.mint(mintee.address, 2)).to.be.revertedWith("ERC20Capped: cap exceeded");
    });
  });

  describe("Burning Tokens", function () {
    let GTF: GovernanceTokenFactory;

    beforeEach(async function () {
      const GTF__factory = await ethers.getContractFactory("GovernanceTokenFactory");
      GTF = <GovernanceTokenFactory>await upgrades.deployProxy(GTF__factory, ["Orange Token", "ORANGE", 10]);
    });

    it("reverts if non-admin tries to set enableBurn", async function () {
      await expect(GTF.connect(mintee).enableBurn()).to.be.revertedWith("AccessControl");
    });

    it("reverts if non-admin tries to set disableBurn", async function () {
      await expect(GTF.connect(mintee).disableBurn()).to.be.revertedWith("AccessControl");
    });

    it("allows admin to set enableBurn", async function () {
      await GTF.connect(admin).enableBurn();
      expect(await GTF.burnable()).to.be.true;
    });

    it("allows admin to set disableBurn", async function () {
      // can only set disable from enabled, so set that first
      await GTF.connect(admin).enableBurn();
      // now set disable
      await GTF.connect(admin).disableBurn();
      expect(await GTF.burnable()).to.be.false;
    });

    it("prevents burning when not enabled", async function () {
      await expect(GTF.connect(admin).burn(1)).to.be.revertedWith("Burnable: burning is disabled");
    });

    it("allows burning when enabled", async function () {
      await GTF.connect(admin).mint(admin.address, 2);
      await GTF.connect(admin).enableBurn();
      await GTF.connect(admin).burn(1);
      expect(await GTF.balanceOf(admin.address)).to.equal(1);
    });

    it("allows burning from a wallet we have an allowance for when burning is enabled", async function () {
      await GTF.connect(admin).mint(mintee.address, 2);
      await GTF.connect(mintee).approve(admin.address, 1);
      await GTF.connect(admin).enableBurn();
      await GTF.connect(admin).burnFrom(mintee.address, 1);
      expect(await GTF.balanceOf(mintee.address)).to.equal(1);
    });

    it("prevents burning more than allowed from a wallet we have an allowance for when burning is enabled", async function () {
      await GTF.connect(admin).mint(mintee.address, 3);
      await GTF.connect(mintee).approve(admin.address, 1);
      await GTF.connect(admin).enableBurn();
      await expect(GTF.connect(admin).burnFrom(mintee.address, 2)).to.be.revertedWith("ERC20: insufficient allowance");
    });
  });

  describe("Pausing", function () {
    let GTF: GovernanceTokenFactory;

    beforeEach(async function () {
      const GTF__factory = await ethers.getContractFactory("GovernanceTokenFactory");
      GTF = <GovernanceTokenFactory>await upgrades.deployProxy(GTF__factory, ["Orange Token", "ORANGE", 10]);
    });

    it("only allows PAUSER to set pause", async function () {
      await expect(GTF.connect(mintee).pause()).to.be.revertedWith("AccessControl");
      await GTF.connect(admin).pause();
      expect(await GTF.paused()).to.be.true;
    });

    it("only allows PAUSER to set unpause", async function () {
      await GTF.connect(admin).pause();
      await expect(GTF.connect(mintee).unpause()).to.be.revertedWith("AccessControl");
      await GTF.connect(admin).unpause();
      expect(await GTF.paused()).to.be.false;
    });

    it("prevents minting when paused", async function () {
      await GTF.connect(admin).pause();
      await expect(GTF.connect(admin).mint(mintee.address, 1)).to.be.revertedWith("Pausable: paused");
    });

    it("prevents burning when paused", async function () {
      await GTF.connect(admin).pause();
      await expect(GTF.connect(admin).burn(1)).to.be.revertedWith("Pausable: paused");
    });

    it("prevents transfers when paused", async function () {
      await GTF.connect(admin).pause();
      await expect(GTF.connect(admin).transfer(mintee.address, 1)).to.be.revertedWith("Pausable: paused");
    });

    it("allows burning when unpaused and burnable", async function () {
      expect(await GTF.paused()).to.be.false;
      await GTF.connect(admin).enableBurn();
      await GTF.connect(admin).mint(admin.address, 2);
      await expect(GTF.connect(admin).burn(1)).to.not.be.reverted;
    });

    it("allows minting when unpaused", async function () {
      expect(await GTF.paused()).to.be.false;
      await GTF.connect(admin).mint(admin.address, 1);
      expect(await GTF.balanceOf(admin.address)).to.equal(1);
    });

    it("allows transfers when unpaused", async function () {
      expect(await GTF.paused()).to.be.false;
      await GTF.connect(admin).mint(admin.address, 1);
      await GTF.connect(admin).transfer(mintee.address, 1);
      expect(await GTF.balanceOf(mintee.address)).to.equal(1);
    });
  });

  describe("Transferrability", function () {
    let GTF: GovernanceTokenFactory;

    beforeEach(async function () {
      const GTF__factory = await ethers.getContractFactory("GovernanceTokenFactory");
      GTF = <GovernanceTokenFactory>await upgrades.deployProxy(GTF__factory, ["Orange Token", "ORANGE", 10]);
    });

    it("only allows admin to set transferrable", async function () {
      await expect(GTF.connect(mintee).enableTransfer()).to.be.revertedWith("AccessControl");
      await GTF.connect(admin).enableTransfer();
      expect(await GTF.transferrable()).to.be.true;
    });

    it("only allows admin to set nontransferrable", async function () {
      // can only set nontransferrable from transferrable, so set that first
      await GTF.connect(admin).enableTransfer();
      // now set nontransferrable
      await expect(GTF.connect(mintee).disableTransfer()).to.be.revertedWith("AccessControl");
      await GTF.connect(admin).disableTransfer();
      expect(await GTF.transferrable()).to.be.false;
    });

    it("allows mint when transfer is disabled", async function () {
      expect(await GTF.transferrable()).to.be.false;
      await GTF.connect(admin).mint(admin.address, 1);
      expect(await GTF.balanceOf(admin.address)).to.equal(1);
    });

    it("prevents burn when transfer is disabled", async function () {
      expect(await GTF.transferrable()).to.be.false;
      await expect(GTF.connect(admin).burn(1)).to.be.revertedWith("Burnable: burning is disabled");
    });

    it("prevents (non-MINTER) transfers when transfer is disabled", async function () {
      expect(await GTF.transferrable()).to.be.false;
      await GTF.connect(admin).mint(mintee.address, 1);
      await expect(GTF.connect(mintee).transfer(admin.address, 1)).to.be.revertedWith(
        "Transferrable: transfers are disabled",
      );
    });

    it("allows transfers when transfer is enabled", async function () {
      expect(await GTF.transferrable()).to.be.false;
      await GTF.connect(admin).enableTransfer();
      await GTF.connect(admin).mint(mintee.address, 1);
      await GTF.connect(mintee).transfer(admin.address, 1);
      expect(await GTF.balanceOf(admin.address)).to.equal(1);
    });
  });
});
