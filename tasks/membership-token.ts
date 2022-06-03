import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { OrigamiMembershipToken, OrigamiMembershipToken__factory } from "../src/types";

task("query:membership-token", "Prints the list of accounts")
  .addParam("contractAddress", "address of the OrigamiMembershipTokenFactory")
  .setAction(async (args: TaskArguments, { ethers }) => {
    const OMT__factory: OrigamiMembershipToken__factory = await ethers.getContractFactory("OrigamiMembershipToken");
    const OMT: OrigamiMembershipToken = await OMT__factory.attach(args.contractAddress);

    console.log("attached to OrigamiMembershipToken");
    // console.log("paused?", await OMT.paused());
    console.log("name", await OMT.name());
    console.log({ OMT });
  });
