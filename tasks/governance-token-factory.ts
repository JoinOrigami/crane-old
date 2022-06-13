import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { OrigamiGovernanceTokenFactory, OrigamiGovernanceTokenFactory__factory } from "../src/types";
import { timeStamp, verboseLog } from "./utils";

task("governance-token-factory:query", "Query task for data about the OrigamiGovernanceTokenFactory contract")
  .addParam("contractAddress", "address of the OrigamiGovernanceTokenFactory")
  .setAction(async (args: TaskArguments, { ethers, upgrades }) => {
    const OGTF__factory: OrigamiGovernanceTokenFactory__factory = await ethers.getContractFactory(
      "OrigamiGovernanceTokenFactory",
    );
    const OGTF: OrigamiGovernanceTokenFactory = await OGTF__factory.attach(args.contractAddress);

    console.log("Attached to OrigamiGovernanceTokenFactory, details follow:");
    console.log({
      admin: await upgrades.erc1967.getAdminAddress(OGTF.address),
      implementation: await upgrades.erc1967.getImplementationAddress(OGTF.address),
    });
  });

task("governance-token-factory:deploy", "Deploys the OrigamiGovernanceToken(Factory) contract")
  .addFlag("verboseOutput", "Adds verbose output to the deploy task")
  .setAction(async (args: TaskArguments, { ethers, network, upgrades }) => {
    console.log(timeStamp(), `Deploying OrigamiGovernanceToken(Factory) on ${network.name}`);

    const OGTF__factory = await ethers.getContractFactory("OrigamiGovernanceTokenFactory");
    verboseLog(args, "OrigamiGovernanceTokenFactory instantiated");
    const OGTF: OrigamiGovernanceTokenFactory = <OrigamiGovernanceTokenFactory>(
      await upgrades.deployProxy(OGTF__factory, [])
    );
    verboseLog(args, "OrigamiGovernanceTokenFactory deploy initiated");
    await OGTF.deployed();
    verboseLog(args, "OrigamiGovernanceTokenFactory deploy completed");
    verboseLog(args, "OrigamiGovernanceTokenFactory transaction hash", OGTF.deployTransaction.hash);

    console.log(timeStamp(), `OrigamiGovernanceTokenFactory deployed at ${OGTF.address}`);

    if (!["hardhat", "localhost"].includes(network.name)) {
      console.log(timeStamp(), "Waiting for >= 5 OrigamiGovernanceTokenFactory deployment confirmations");
      await OGTF.deployTransaction.wait(5);
    }
    console.log(timeStamp(), "Finished deploy!");
    console.log(
      `When ready, verify with: \n\nyarn hardhat post-verify --network ${network.name} --contract-address ${OGTF.address}`,
    );
  });

task("governance-token-factory:get-proxy-at-index", "Get the proxy address of a cloned governance token at an index")
  .addParam("index", "Index of the governance token to get the proxy address of")
  .addParam("contractAddress", "Address of the OrigamiGovernanceTokenFactory")
  .setAction(async (args: TaskArguments, { ethers }) => {
    const OGTF__factory: OrigamiGovernanceTokenFactory__factory = await ethers.getContractFactory(
      "OrigamiGovernanceTokenFactory",
    );
    const OGTF: OrigamiGovernanceTokenFactory = await OGTF__factory.attach(args.contractAddress);
    console.log(await OGTF.getProxyContractAddress(args.index));
  });

task("governance-token-factory:upgrade", "Upgrades the OrigamiGovernanceTokenFactory contract")
  .addParam("proxyAddress", "address of the OrigamiGovernanceTokenFactory proxy")
  .setAction(async (args: TaskArguments, { ethers, network, upgrades }) => {
    console.log(timeStamp(), `Upgrading OrigamiGovernanceTokenFactory on ${network.name}`);
    const OGTF__factory = await ethers.getContractFactory("OrigamiGovernanceTokenFactory");
    const OGTF = await upgrades.upgradeProxy(args.proxyAddress, OGTF__factory);
    console.log(timeStamp(), `OrigamiGovernanceTokenFactor: upgraded at ${OGTF.address}`);
  });
