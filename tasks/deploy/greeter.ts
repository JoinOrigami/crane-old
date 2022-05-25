import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { GreeterV2 } from "../../src/types";
import type { Greeter } from "../../src/types/Greeter";
import type { GreeterV2__factory } from "../../src/types/factories/Greeter2.sol/GreeterV2__factory";
import type { Greeter__factory } from "../../src/types/factories/Greeter__factory";

task("deploy:Greeter")
  .addParam("greeting", "Say hello, be nice")
  .setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
    const greeterFactory: Greeter__factory = <Greeter__factory>await ethers.getContractFactory("Greeter");
    const greeter: Greeter = <Greeter>(
      await upgrades.deployProxy(greeterFactory, [taskArguments.greeting], { initializer: "setGreeting" })
    );
    await greeter.deployed();
    console.log("Greeter deployed to: ", greeter.address);
  });

task("upgrade:Greeter")
  .addParam("address", "Address of the greeter proxy")
  .setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
    const greeterFactory: GreeterV2__factory = <GreeterV2__factory>await ethers.getContractFactory("GreeterV2");
    const greeter: GreeterV2 = <GreeterV2>await upgrades.upgradeProxy(taskArguments.address, greeterFactory);
    await greeter.deployed();
    console.log("Greeter deployed to: ", greeter.address);
  });

task("verify:Greeter")
  .addParam("address", "Address of the greeter proxy")
  .setAction(async (args: TaskArguments, { network, run }) => {
    if (!["hardhat", "localhost"].includes(network.name)) {
      console.log("Verifying Greeter on Polygonscan...");
      await run("verify:verify", { address: args.address, constructorArguments: [] });
    }
  });
