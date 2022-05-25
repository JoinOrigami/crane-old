import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { GreeterV2 } from "../../src/types";
import type { Greeter } from "../../src/types/Greeter";
import type { Greeter__factory } from "../../src/types/factories/Greeter__factory";
import type { GreeterV2__factory } from "../../src/types/factories/contracts/Greeter2.sol/GreeterV2__factory";

task("deploy:Greeter")
  .addParam("greeting", "Say hello, be nice")
  .setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
    const greeterFactory: Greeter__factory = <Greeter__factory>await ethers.getContractFactory("Greeter");
    console.log(taskArguments);
    const greeter: Greeter = <Greeter>(
      await upgrades.deployProxy(greeterFactory, ["Heidy ho!"], { initializer: "setGreeting" })
    );
    await greeter.deployed();
    console.log("Greeter deployed to: ", greeter.address);
  });

task("upgrade:Greeter").setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
  const greeterFactory: GreeterV2__factory = <GreeterV2__factory>await ethers.getContractFactory("GreeterV2");
  console.log(taskArguments);
  const greeter: GreeterV2 = <GreeterV2>(
    await upgrades.upgradeProxy("0xAf98B6a354Dbaf38708bb22289370c895132d5Fa", greeterFactory)
  );
  await greeter.deployed();
  console.log("Greeter deployed to: ", greeter.address);
});
