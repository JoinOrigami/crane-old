import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers, upgrades } from "hardhat";

import type { OrigamiMembershipToken } from "../src/types";

use(solidity);

describe("MembershipToken", function () {
  let signers: SignerWithAddress[];
  let admin: SignerWithAddress;
  let mintee: SignerWithAddress;

  before(async function () {
    signers = await ethers.getSigners();
    admin = signers[0];
    mintee = signers[1];
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
});
