import { readFileSync } from "fs";

const readInput = (dayNumber: string): string[] => {
  const data = readFileSync(`./day${dayNumber}/input.txt`, "utf8");
  return data.split("\n");
};

const main = async () => {
  const dayNumber = process.argv[2];
  const module = await import(`./day${dayNumber}`);

  if (module.Task1 !== undefined) {
    console.log("Task 1: ", module.Task1(readInput(dayNumber)));
  }

  if (module.Task2 !== undefined) {
    console.log("Task 2: ", module.Task2(readInput(dayNumber)));
  }
};

main();
