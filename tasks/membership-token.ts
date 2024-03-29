import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { exit } from "process";

import {
  OrigamiMembershipToken,
  OrigamiMembershipTokenFactory,
  OrigamiMembershipTokenFactory__factory,
  OrigamiMembershipToken__factory,
} from "../src/types";
import { timeStamp, verboseLog } from "./utils";

task("membership-token:query", "query task for data about the OrigamiMembershipToken contract")
  .addParam("contractAddress", "address of the OrigamiMembershipToken")
  .setAction(async (args: TaskArguments, { ethers, upgrades }) => {
    const OMT__factory: OrigamiMembershipToken__factory = await ethers.getContractFactory("OrigamiMembershipToken");
    const OMT: OrigamiMembershipToken = await OMT__factory.attach(args.contractAddress);

    console.log("status:", {
      admin: await upgrades.erc1967.getAdminAddress(args.contractAddress),
      name: await OMT.name(),
      symbol: await OMT.symbol(),
      minterRole: await OMT.MINTER_ROLE(),
      pauserRole: await OMT.PAUSER_ROLE(),
      revokerRole: await OMT.REVOKER_ROLE(),
      paused: await OMT.paused(),
      transferrable: await OMT.transferrable(),
    });
  });

task("membership-token:change-proxy-admin", "Update the admin for the proxy")
  .addParam("proxyAddress", "address of the OrigamiMembershipToken proxy")
  .addParam("admin", "address of the new admin")
  .setAction(async (args: TaskArguments, { upgrades }) => {
    await upgrades.admin.changeProxyAdmin(args.proxyAddress, args.admin);
  });

task(
  "membership-token:deploy",
  "DO NOT USE! CLONE INSTEAD WHENEVER POSSIBLE!! Does a direct deploy of the OrigamiMembershipToken contract",
)
  .addFlag("verboseOutput", "Adds verbose output to the deploy task")
  .addFlag("confirmDeploy", "Confirms that, against all advice, you still want to deploy instead of clone.")
  .addParam("admin", "address of the admin for the OrigamiMembershipToken generated by the factory")
  .addParam("name", "name for the OrigamiMembershipToken generated by the factory")
  .addParam("symbol", "symbol for the OrigamiMembershipToken generated by the factory")
  .addParam("baseUri", "baseURI for the OrigamiMembershipToken generated by the factory")
  .setAction(async (args: TaskArguments, { ethers, network, upgrades }) => {
    if (!args.confirmDeploy) {
      console.log("It is STRONGLY recommended that you clone instead of deploy.");
      console.log("   -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
      console.log("If you are certain that you still want to deploy, run this task again with --confirm-deploy\n");
      exit(1);
    }

    console.log(timeStamp(), `Deploying OrigamiMembershipToken on ${network.name}`);

    const OMT__factory = await ethers.getContractFactory("OrigamiMembershipToken");
    verboseLog(args, "OrigamiMembershipToken instantiated");
    const OMT: OrigamiMembershipToken = <OrigamiMembershipToken>(
      await upgrades.deployProxy(OMT__factory, [args.admin, args.name, args.symbol, args.baseUri])
    );
    verboseLog(args, "OrigamiMembershipToken deploy initiated");
    await OMT.deployed();

    verboseLog(args, "OrigamiMembershipToken deploy completed");
    verboseLog(args, "OrigamiMembershipToken transaction", OMT.deployTransaction.hash);
    verboseLog(
      args,
      "OrigamiMembershipToken transaction receipt",
      await (
        await ethers.provider.getTransactionReceipt(OMT.deployTransaction.hash)
      ).transactionHash,
    );
    console.log(timeStamp(), `OrigamiMembershipToken deployed at ${OMT.address}`);

    if (!["hardhat", "localhost"].includes(network.name)) {
      console.log(timeStamp(), "Waiting for >= 5 OrigamiMembershipToken deployment confirmations");
      await OMT.deployTransaction.wait(5);
    }
    console.log(timeStamp(), "Finished deploy!");
    console.log(
      `\nWhen ready, verify with: \n\nyarn hardhat post-verify --network ${network.name} --contract-address ${OMT.address}`,
    );
  });

task("membership-token:clone", "Clones a new membership token from the factory contract")
  .addParam("contractAddress", "address of the OrigamiMembershipTokenFactory")
  .addParam("admin", "address of the admin for the OrigamiMembershipToken generated by the factory")
  .addParam("name", "name for the OrigamiMembershipToken generated by the factory")
  .addParam("symbol", "symbol for the OrigamiMembershipToken generated by the factory")
  .addParam("baseUri", "baseURI for the OrigamiMembershipToken generated by the factory")
  .setAction(async (args: TaskArguments, { ethers }) => {
    const OMTF__factory: OrigamiMembershipTokenFactory__factory = await ethers.getContractFactory(
      "OrigamiMembershipTokenFactory",
    );
    const OMTF: OrigamiMembershipTokenFactory = await OMTF__factory.attach(args.contractAddress);

    console.log("attached to OrigamiMembershipTokenFactory");
    console.log(await OMTF.DEFAULT_ADMIN_ROLE());
    console.log({ args });

    const tx = await OMTF.createOrigamiMembershipToken(args.admin, args.name, args.symbol, args.baseUri);
    await tx.wait();

    console.log("OrigamiMembershipToken created");

    // console.log({ tx });
    console.log(`OrigamiMembershipToken deployed at ${tx.to}`);
  });

task("membership-token:upgrade", "Upgrades the OrigamiMembershipToken contract")
  .addParam("proxyAddress", "address of the OrigamiMembershipToken proxy")
  .setAction(async (args: TaskArguments, { ethers, network, upgrades }) => {
    console.log(timeStamp(), `Upgrading OrigamiMembershipToken on ${network.name}`);
    const OMT__factory = await ethers.getContractFactory("OrigamiMembershipToken");
    const OMT = await upgrades.upgradeProxy(args.proxyAddress, OMT__factory);
    console.log(timeStamp(), `OrigamiMembershipToken transaction ${OMT.deployTransaction.hash}`);
    console.log(timeStamp(), `OrigamiMembershipToken upgraded at ${OMT.address}`);
  });

task("membership-token:upgrade-forced", "Upgrades the OrigamiMembershipToken contract")
  .addParam("proxyAddress", "address of the OrigamiMembershipToken proxy")
  .addFlag("verboseOutput", "Adds verbose output to the deploy task")
  .setAction(async (args: TaskArguments, { ethers, network, upgrades }) => {
    console.log(timeStamp(), `Upgrading OrigamiMembershipToken on ${network.name}`);
    const OMT__factory = await ethers.getContractFactory("OrigamiMembershipToken");
    verboseLog(args, "forcing the import of the previously deployed OrigamiMembershipToken for upgrade");
    await upgrades.forceImport(args.proxyAddress, OMT__factory);
    const OMT = await upgrades.upgradeProxy(args.proxyAddress, OMT__factory);
    console.log(timeStamp(), `OrigamiMembershipToken upgraded at ${OMT.address}`);
  });

task("membership-token:grant-app-roles", "Idempotently grants the minter and revoker roles to the specified address")
  .addParam("proxyAddress", "address of the OrigamiMembershipToken proxy")
  .addParam("appRoleRecipient", "address of the recipient of the application roles")
  .addFlag("verboseOutput", "Adds verbose output")
  .setAction(async (args: TaskArguments, { ethers }) => {
    console.log({ args });
    console.log(timeStamp(), `Granting application roles to ${args.appRoleRecipient}`);
    const OMT__factory = await ethers.getContractFactory("OrigamiMembershipToken");
    const OMT = await OMT__factory.attach(args.proxyAddress);

    const minterRole = await OMT.MINTER_ROLE();
    const revokerRole = await OMT.REVOKER_ROLE();
    const hasMinterRole = await OMT.hasRole(minterRole, args.appRoleRecipient);
    const hasRevokerRole = await OMT.hasRole(revokerRole, args.appRoleRecipient);

    verboseLog(args, { hasMinterRole, hasRevokerRole });

    if (hasMinterRole) {
      verboseLog(args, "minter role already granted");
    } else {
      await OMT.grantRole(minterRole, args.appRoleRecipient);
      verboseLog(args, "minter role granted");
    }

    if (hasRevokerRole) {
      verboseLog(args, "revoker role already granted");
    } else {
      await OMT.grantRole(revokerRole, args.appRoleRecipient);
      verboseLog(args, "revoker role granted");
    }

    console.log(timeStamp(), `Application roles granted to ${args.appRoleRecipient}`);
  });
