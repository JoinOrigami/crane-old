import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import "./membership-token";
import "./membership-token-factory";

task("post-verify")
  .addParam("contractAddress", "string")
  .setAction(async (args: TaskArguments, { network, run }) => {
    if (!["hardhat", "localhost"].includes(network.name)) {
      console.log("Verifying contract on Polygonscan...");
      await run("verify:verify", { address: args.contractAddress, constructorArguments: [] });
    }
  });
