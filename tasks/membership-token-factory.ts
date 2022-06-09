import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { OrigamiMembershipTokenFactory, OrigamiMembershipTokenFactory__factory } from "../src/types";
import { timeStamp, verboseLog } from "./utils";

task("membership-token-factory:query", "Query task for data about the OrigamiMembershipTokenFactory contract")
  .addParam("contractAddress", "address of the OrigamiMembershipTokenFactory")
  .setAction(async (args: TaskArguments, { ethers, upgrades }) => {
    const OMTF__factory: OrigamiMembershipTokenFactory__factory = await ethers.getContractFactory(
      "OrigamiMembershipTokenFactory",
    );
    const OMTF: OrigamiMembershipTokenFactory = await OMTF__factory.attach(args.contractAddress);

    console.log("Attached to OrigamiMembershipTokenFactory, details follow:");
    console.log({
      admin: await upgrades.erc1967.getAdminAddress(OMTF.address),
      implementation: await upgrades.erc1967.getImplementationAddress(OMTF.address),
      beacon: await upgrades.erc1967.getBeaconAddress(OMTF.address),
    });
  });

task("membership-token-factory:deploy", "Deploys the OrigamiMembershipToken(Factory) contract")
  .addFlag("verboseOutput", "Adds verbose output to the deploy task")
  .setAction(async (args: TaskArguments, { ethers, network, upgrades }) => {
    console.log(timeStamp(), `Deploying OrigamiMembershipToken(Factory) on ${network.name}`);

    const OMTF__factory = await ethers.getContractFactory("OrigamiMembershipTokenFactory");
    verboseLog(args, "OrigamiMembershipTokenFactory instantiated");
    const OMTF: OrigamiMembershipTokenFactory = <OrigamiMembershipTokenFactory>(
      await upgrades.deployProxy(OMTF__factory, [])
    );
    verboseLog(args, "OrigamiMembershipTokenFactory deploy initiated");
    await OMTF.deployed();
    verboseLog(args, "OrigamiMembershipTokenFactory deploy completed");
    verboseLog(args, "OrigamiMembershipTokenFactory transaction hash", OMTF.deployTransaction.hash);

    console.log(timeStamp(), `OrigamiMembershipTokenFactory deployed at ${OMTF.address}`);

    if (!["hardhat", "localhost"].includes(network.name)) {
      console.log(timeStamp(), "Waiting for >= 5 OrigamiMembershipTokenFactory deployment confirmations");
      await OMTF.deployTransaction.wait(5);
    }
    console.log(timeStamp(), "Finished deploy!");
    console.log(
      `When ready, verify with: \n\nyarn hardhat post-verify --network ${network.name} --contract-address ${OMTF.address}`,
    );
  });

task("membership-token-factory:get-proxy-address", "Get the proxy address of a cloned membership token at an index")
  .addParam("index", "Index of the membership token to get the proxy address of")
  .addParam("contractAddress", "Address of the OrigamiMembershipTokenFactory")
  .setAction(async (args: TaskArguments, { ethers }) => {
    const OMTF__factory: OrigamiMembershipTokenFactory__factory = await ethers.getContractFactory(
      "OrigamiMembershipTokenFactory",
    );
    const OMTF: OrigamiMembershipTokenFactory = await OMTF__factory.attach(args.contractAddress);
    console.log(await OMTF.getProxyContractAddress(args.index));
  });

task("membership-token-factory:upgrade", "Upgrades the OrigamiMembershipTokenFactory contract")
  .addParam("proxyAddress", "address of the OrigamiMembershipTokenFactory proxy")
  .setAction(async (args: TaskArguments, { ethers, network, upgrades }) => {
    console.log(timeStamp(), `Upgrading OrigamiMembershipTokenFactory on ${network.name}`);
    const OMTF__factory = await ethers.getContractFactory("OrigamiMembershipTokenFactory");
    const OMTF = await upgrades.upgradeProxy(args.proxyAddress, OMTF__factory);
    console.log(timeStamp(), `OrigamiMembershipTokenFactor: upgraded at ${OMTF.address}`);
  });
