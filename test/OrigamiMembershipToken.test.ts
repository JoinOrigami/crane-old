import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers, upgrades } from "hardhat";

import type { OrigamiMembershipToken } from "../src/types";

use(solidity);

describe("MembershipToken", function () {
  let signers: SignerWithAddress[];
  // let admin: SignerWithAddress;
  let owner: SignerWithAddress;
  let mintee: SignerWithAddress;
  let mintee2: SignerWithAddress;

  before(async function () {
    signers = await ethers.getSigners();
    // admin = signers[0];
    owner = signers[1];
    mintee = signers[2];
    mintee2 = signers[3];
  });

  describe("initializing", function () {
    it("reverts when initialized with the zero address as the admin", async function () {
      const OM__factory = await ethers.getContractFactory("OrigamiMembershipToken");
      await expect(
        upgrades.deployProxy(OM__factory, [
          ethers.constants.AddressZero,
          "Deciduous Tree DAO Membership",
          "DTM",
          "https://ipfs.io/",
        ]),
      ).to.be.revertedWith("Admin address cannot be zero");
    });
  });

  describe("upgrading", () => {
    it("reverts when upgrading to the zero address", async () => {
      // this version does not have a transferenabled event emitted
      const OMBIAF__factory = await ethers.getContractFactory("OrigamiMembershipTokenBeforeInitialAuditFeedback");
      // this version _does_ emit a transferenabled event
      const OM__factory = await ethers.getContractFactory("OrigamiMembershipToken");
      const OMBIAF = await upgrades.deployProxy(OMBIAF__factory, [
        owner.address,
        "Deciduous Tree DAO Membership",
        "DTM",
        "ipfs://d34d7233",
      ]);
      // not throwing an error on upgrade means the storage layout is unaffected
      const OM = await upgrades.upgradeProxy(OMBIAF.address, OM__factory);
      await expect(OM.connect(owner).enableTransfer()).to.emit(OM, "TransferEnabled");
    });
  });

  describe("minting", function () {
    let OM: OrigamiMembershipToken;

    beforeEach(async function () {
      const OM__factory = await ethers.getContractFactory("OrigamiMembershipToken");
      OM = <OrigamiMembershipToken>(
        await upgrades.deployProxy(OM__factory, [
          owner.address,
          "Deciduous Tree DAO Membership",
          "DTM",
          "https://ipfs.io/",
        ])
      );
    });

    it("mints membership NFTs", async function () {
      await OM.connect(owner).safeMint(mintee.address);
      expect(await OM.balanceOf(mintee.address)).to.be.eq(1);
      expect(await OM.ownerOf(1)).to.be.eq(mintee.address);
      expect(await OM.tokenURI(1)).to.be.eq("https://ipfs.io/1");
    });

    it("limits minting to one NFT per address", async function () {
      await OM.connect(owner).safeMint(mintee.address);
      await expect(OM.connect(owner).safeMint(mintee.address)).to.be.revertedWith("Holders may only have one token");
    });

    it("emits a Mint event", async function () {
      await expect(OM.connect(owner).safeMint(mintee.address)).to.emit(OM, "Mint").withArgs(mintee.address, 1);
    });
  });

  describe("metadata", function () {
    let OM: OrigamiMembershipToken;

    beforeEach(async function () {
      const OM__factory = await ethers.getContractFactory("OrigamiMembershipToken");
      OM = <OrigamiMembershipToken>(
        await upgrades.deployProxy(OM__factory, [
          owner.address,
          "Deciduous Tree DAO Membership",
          "DTM",
          "https://ipfs.io/",
        ])
      );
    });
    it("reverts when attempting to fetch tokenId 0", async function () {
      await expect(OM.tokenURI(0)).to.be.reverted;
    });

    it("reverts when attempting to fetch an unminted tokenId", async function () {
      await expect(OM.tokenURI(2)).to.be.reverted;
    });

    it("emits an event when the base URI is changed", async () => {
      await expect(OM.connect(owner).setBaseURI("tacos"))
        .to.emit(OM, "BaseURIChanged")
        .withArgs(owner.address, "tacos");
    });

    it("allows the admin to set a base URI", async function () {
      await OM.connect(owner).safeMint(mintee.address);
      await OM.connect(owner).setBaseURI("https://ipfs.io/inter-planetary/");
      expect(await OM.tokenURI(1)).to.be.eq("https://ipfs.io/inter-planetary/1");
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
        await upgrades.deployProxy(OM__factory, [
          owner.address,
          "Deciduous Tree DAO Membership",
          "DTM",
          "https://ipfs.io/",
        ])
      );
    });

    it("allows the admin to pause", async function () {
      await OM.connect(owner).pause();
      expect(await OM.paused()).to.be.eq(true);
    });

    it("reverts when a non-admin tries to pause", async function () {
      await expect(OM.connect(mintee).pause()).to.be.revertedWith("AccessControl");
    });

    it("allows the admin to unpause", async function () {
      await OM.connect(owner).pause();
      await OM.connect(owner).unpause();
      expect(await OM.paused()).to.be.eq(false);
    });

    it("reverts when a non-admin tries to unpause", async function () {
      await expect(OM.connect(mintee).unpause()).to.be.revertedWith("AccessControl");
    });

    it("prevents minting when paused", async function () {
      await OM.connect(owner).pause();
      await expect(OM.connect(owner).safeMint(mintee.address)).to.be.revertedWith("Pausable: paused");
    });
  });

  describe("transferrability", function () {
    let OM: OrigamiMembershipToken;
    let minter: SignerWithAddress;

    beforeEach(async function () {
      const OM__factory = await ethers.getContractFactory("OrigamiMembershipToken");
      OM = <OrigamiMembershipToken>(
        await upgrades.deployProxy(OM__factory, [
          owner.address,
          "Deciduous Tree DAO Membership",
          "DTM",
          "https://ipfs.io/",
        ])
      );
      minter = signers[4];
      await OM.connect(owner).grantRole(await OM.MINTER_ROLE(), minter.address);
    });

    it("emits an event when transfer is enabled", async () => {
      await expect(OM.connect(owner).enableTransfer()).to.emit(OM, "TransferEnabled").withArgs(owner.address, true);
    });

    it("emits an event when transfer is enabled", async () => {
      await OM.connect(owner).enableTransfer();
      await expect(OM.connect(owner).disableTransfer()).to.emit(OM, "TransferEnabled").withArgs(owner.address, false);
    });

    it("allows minter to transfer (aka mint) when nontransferrable", async function () {
      expect(await OM.transferrable()).to.be.eq(false);
      // admin has minter role
      await OM.connect(owner).safeMint(mintee.address);
      expect(await OM.balanceOf(mintee.address)).to.be.eq(1);
      // minter has minter role too
      await OM.connect(minter).safeMint(mintee2.address);
      expect(await OM.balanceOf(mintee2.address)).to.be.eq(1);
    });

    it("prevents token transfers when disabled", async function () {
      await OM.connect(owner).safeMint(mintee.address);
      await expect(OM.connect(mintee).transferFrom(mintee.address, mintee2.address, 1)).to.be.revertedWith(
        "Transferrable: transfers are disabled",
      );
      await expect(
        OM.connect(mintee)["safeTransferFrom(address,address,uint256)"](mintee.address, mintee2.address, 1),
      ).to.be.revertedWith("Transferrable: transfers are disabled");
      await expect(
        OM.connect(mintee)["safeTransferFrom(address,address,uint256,bytes)"](mintee.address, mintee2.address, 1, "0x"),
      ).to.be.revertedWith("Transferrable: transfers are disabled");
    });

    it("prevents a single address from being transferred more than one token", async function () {
      await OM.connect(minter).safeMint(mintee.address);
      await OM.connect(minter).safeMint(mintee2.address);
      await OM.connect(owner).enableTransfer();
      await expect(OM.connect(mintee).transferFrom(mintee.address, mintee2.address, 1)).to.be.revertedWith(
        "Holders may only have one token",
      );
    });

    it("allows token transfers when enabled", async function () {
      await OM.connect(owner).enableTransfer();
      await OM.connect(owner).safeMint(mintee.address);
      await OM.connect(mintee).transferFrom(mintee.address, mintee2.address, 1);
      expect(await OM.balanceOf(mintee2.address)).to.be.eq(1);

      await OM.connect(mintee2)["safeTransferFrom(address,address,uint256)"](mintee2.address, mintee.address, 1);
      expect(await OM.balanceOf(mintee2.address)).to.be.eq(0);
      expect(await OM.balanceOf(mintee.address)).to.be.eq(1);

      await OM.connect(mintee)["safeTransferFrom(address,address,uint256,bytes)"](
        mintee.address,
        mintee2.address,
        1,
        "0x",
      );
      expect(await OM.balanceOf(mintee2.address)).to.be.eq(1);
      expect(await OM.balanceOf(mintee.address)).to.be.eq(0);
    });

    it("only allows the owner to transfer when transferrable", async function () {
      await OM.connect(owner).safeMint(mintee.address);
      await OM.connect(owner).enableTransfer();
      await expect(OM.connect(mintee2).transferFrom(mintee.address, mintee2.address, 1)).to.be.revertedWith(
        "ERC721: transfer caller is not owner nor approved",
      );
    });

    it("prevents enabling transfers when they're already enabled", async function () {
      await OM.connect(owner).enableTransfer();
      await expect(OM.connect(owner).enableTransfer()).to.be.revertedWith("Transferrable: transfers are enabled");
    });

    it("allows disabling transfers after they've been enabled", async function () {
      await OM.connect(owner).enableTransfer();
      await OM.connect(owner).disableTransfer();
      expect(await OM.transferrable()).to.be.false;
    });
  });

  describe("revoking", function () {
    let OM: OrigamiMembershipToken;
    let revoker: SignerWithAddress;

    beforeEach(async function () {
      const OM__factory = await ethers.getContractFactory("OrigamiMembershipToken");
      OM = <OrigamiMembershipToken>(
        await upgrades.deployProxy(OM__factory, [
          owner.address,
          "Deciduous Tree DAO Membership",
          "DTM",
          "https://ipfs.io/",
        ])
      );
      revoker = signers[4];
      await OM.connect(owner).grantRole(await OM.REVOKER_ROLE(), revoker.address);
    });

    it("allows admin to revoke", async function () {
      await OM.connect(owner).safeMint(mintee.address);
      expect(await OM.balanceOf(mintee.address)).to.be.eq(1);
      // admin is a revoker
      await OM.connect(owner).revoke(mintee.address);
      expect(await OM.balanceOf(mintee.address)).to.be.eq(0);
      // can burn more than once (limitBalance modifier doesn't apply)
      await OM.connect(owner).safeMint(mintee.address);
      await OM.connect(owner).revoke(mintee.address);
      expect(await OM.balanceOf(mintee.address)).to.be.eq(0);
    });

    it("allows REVOKER to revoke", async function () {
      await OM.connect(owner).connect(owner).safeMint(mintee.address);
      expect(await OM.balanceOf(mintee.address)).to.be.eq(1);
      // revoker is also a revoker
      await OM.connect(revoker).revoke(mintee.address);
      expect(await OM.balanceOf(mintee.address)).to.be.eq(0);
    });

    it("reverts when non-admin tries to revoke", async function () {
      await expect(OM.connect(mintee2).revoke(mintee.address)).to.be.revertedWith("AccessControl");
    });

    it("reverts when from address does not own a token", async function () {
      await expect(OM.connect(owner).revoke(mintee.address)).to.be.revertedWith("Revoke: cannot revoke");
    });
  });
});
