import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers, upgrades } from "hardhat";

import type { OrigamiMembershipToken } from "../src/types";

use(solidity);

describe("MembershipToken", function () {
  let signers: SignerWithAddress[];
  // let admin: SignerWithAddress;
  let mintee: SignerWithAddress;
  let mintee2: SignerWithAddress;
  let minter: SignerWithAddress;

  before(async function () {
    signers = await ethers.getSigners();
    // admin = signers[0];
    mintee = signers[1];
    mintee2 = signers[2];
    minter = signers[3];
  });

  describe("minting", function () {
    let OM: OrigamiMembershipToken;

    beforeEach(async function () {
      const OM__factory = await ethers.getContractFactory("OrigamiMembershipToken");
      OM = <OrigamiMembershipToken>(
        await upgrades.deployProxy(OM__factory, ["Deciduous Tree DAO Membership", "DTM", "https://ipfs.io/"])
      );
    });

    it("mints membership NFTs", async function () {
      await OM.safeMint(mintee.address, "foo");
      expect(await OM.balanceOf(mintee.address)).to.be.eq(1);
      expect(await OM.ownerOf(1)).to.be.eq(mintee.address);
      expect(await OM.tokenURI(1)).to.be.eq("https://ipfs.io/foo");
    });

    it("limits minting to one NFT per address", async function () {
      await OM.safeMint(mintee.address, "foo");
      await expect(OM.safeMint(mintee.address, "bar")).to.be.revertedWith("Mint limit exceeded");
    });
  });

  describe("metadata", function () {
    let OM: OrigamiMembershipToken;

    beforeEach(async function () {
      const OM__factory = await ethers.getContractFactory("OrigamiMembershipToken");
      OM = <OrigamiMembershipToken>(
        await upgrades.deployProxy(OM__factory, ["Deciduous Tree DAO Membership", "DTM", "https://ipfs.io/"])
      );
    });
    it("reverts when attempting to fetch tokenId 0", async function () {
      await expect(OM.tokenURI(0)).to.be.revertedWith("Invalid tokenId");
    });

    it("reverts when attempting to fetch an unminted tokenId", async function () {
      await expect(OM.tokenURI(2)).to.be.revertedWith("Invalid tokenId");
    });

    it("allows the admin to set a base URI", async function () {
      await OM.safeMint(mintee.address, "foo");
      await OM.setBaseURI("https://ipfs.io/inter-planetary/");
      expect(await OM.tokenURI(1)).to.be.eq("https://ipfs.io/inter-planetary/foo");
    });

    it("reverts when a non-admin tries to setBaseURI", async function () {
      await expect(OM.connect(mintee).setBaseURI("https://ipfs.io/inter-planetary/")).to.be.revertedWith(
        "AccessControl",
      );
    });
  });

  describe("pausing", function () {
    let OM: OrigamiMembershipToken;

    beforeEach(async function () {
      const OM__factory = await ethers.getContractFactory("OrigamiMembershipToken");
      OM = <OrigamiMembershipToken>(
        await upgrades.deployProxy(OM__factory, ["Deciduous Tree DAO Membership", "DTM", "https://ipfs.io/"])
      );
    });

    it("allows the admin to pause", async function () {
      await OM.pause();
      expect(await OM.paused()).to.be.eq(true);
    });

    it("reverts when a non-admin tries to pause", async function () {
      await expect(OM.connect(mintee).pause()).to.be.revertedWith("AccessControl");
    });

    it("allows the admin to unpause", async function () {
      await OM.pause();
      await OM.unpause();
      expect(await OM.paused()).to.be.eq(false);
    });

    it("reverts when a non-admin tries to unpause", async function () {
      await expect(OM.connect(mintee).unpause()).to.be.revertedWith("AccessControl");
    });

    it("prevents minting when paused", async function () {
      await OM.pause();
      await expect(OM.safeMint(mintee.address, "foo")).to.be.revertedWith("Pausable: paused");
    });
  });

  describe("transferrability", function () {
    let OM: OrigamiMembershipToken;

    beforeEach(async function () {
      const OM__factory = await ethers.getContractFactory("OrigamiMembershipToken");
      OM = <OrigamiMembershipToken>(
        await upgrades.deployProxy(OM__factory, ["Deciduous Tree DAO Membership", "DTM", "https://ipfs.io/"])
      );
      await OM.grantRole(await OM.MINTER_ROLE(), minter.address);
    });

    it("allows minter to transfer (aka mint) when nontransferrable", async function () {
      expect(await OM.transferrable()).to.be.eq(false);
      // admin has minter role
      await OM.safeMint(mintee.address, "foo");
      expect(await OM.balanceOf(mintee.address)).to.be.eq(1);
      // minter has minter role too
      await OM.connect(minter).safeMint(mintee2.address, "foo");
      expect(await OM.balanceOf(mintee2.address)).to.be.eq(1);
    });

    it("prevents token transfers when disabled", async function () {
      await OM.safeMint(mintee.address, "foo");
      await expect(OM.connect(mintee).transferFrom(mintee.address, mintee2.address, 1)).to.be.revertedWith(
        "Transferrable: transfers are disabled",
      );
    });

    it("allows token transfers when enabled", async function () {
      await OM.safeMint(mintee.address, "foo");
      await OM.enableTransfer();
      await OM.connect(mintee).transferFrom(mintee.address, mintee2.address, 1);
      expect(await OM.balanceOf(mintee2.address)).to.be.eq(1);
    });

    it("prevents enabling transfers when they're already enabled", async function () {
      await OM.enableTransfer();
      await expect(OM.enableTransfer()).to.be.revertedWith("Transferrable: transfers are enabled");
    });

    it("allows disabling transfers after they've been enabled", async function () {
      await OM.enableTransfer();
      await OM.disableTransfer();
      expect(await OM.transferrable()).to.be.false;
    });
  });
});
