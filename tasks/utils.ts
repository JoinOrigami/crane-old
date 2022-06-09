import { TaskArguments } from "hardhat/types";

export const timeStamp = (): string => {
  const time: Date = new Date();
  return `${time.toLocaleTimeString()}`;
};

export const verboseLog = (args: TaskArguments, ...logArgs: (string | object)[]) => {
  const verbose: boolean = args.verboseOutput;
  if (verbose) {
    console.log(timeStamp(), ...logArgs);
  }
};
