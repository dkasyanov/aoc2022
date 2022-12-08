import { Console } from "console";
import { readFileSync } from "fs";

const readInput = () => {
  const data = readFileSync(`${__dirname}/input.txt`, "utf8");
  return data.split("\n");
};

const Task1 = () => {
  let visible = 0;
  const data = readInput().map((line) =>
    line.split("").map((x) => parseInt(x))
  );
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (
        i === 0 ||
        j === 0 ||
        i === data.length - 1 ||
        j === data[0].length - 1
      ) {
        visible++;
        continue;
      }

      if (Math.max(...data[i].slice(0, j)) < data[i][j]) {
        visible++;
        // console.log("left", { i, j, v: data[i][j] });
        continue;
      }

      if (Math.max(...data[i].slice(j + 1, data[i].length)) < data[i][j]) {
        visible++;
        // console.log("right", { i, j, v: data[i][j] });
        continue;
      }

      let top = [];
      let bottom = [];
      for (let x = 0; x < data.length; x++) {
        if (x < i) {
          top.push(data[x][j]);
        } else if (x > i) {
          bottom.push(data[x][j]);
        }
      }

      if (Math.max(...top) < data[i][j]) {
        visible++;
        // console.log("top", { i, j, v: data[i][j] });
        continue;
      }

      if (Math.max(...bottom) < data[i][j]) {
        visible++;
        // console.log("bottom", { i, j, v: data[i][j] });
        continue;
      }
    }
  }

  return visible;
};

const Task2 = () => {
  const data = readInput().map((line) =>
    line.split("").map((x) => parseInt(x))
  );
  let maxScore = 0;

  for (let i = 1; i < data.length - 1; i++) {
    for (let j = 1; j < data[0].length - 1; j++) {
      const curr = data[i][j];

      let l = 0,
        r = 0,
        t = 0,
        b = 0;

      for (const x of data[i].slice(0, j).reverse()) {
        l++;
        if (x >= curr) {
          break;
        }
      }

      for (const x of data[i].slice(j + 1, data[i].length)) {
        r++;
        if (x >= curr) {
          break;
        }
      }

      let top = [];
      let bottom = [];
      for (let x = 0; x < data.length; x++) {
        if (x < i) {
          top.push(data[x][j]);
        } else if (x > i) {
          bottom.push(data[x][j]);
        }
      }

      for (const x of top.reverse()) {
        t++;
        if (x >= curr) {
          break;
        }
      }

      for (const x of bottom) {
        b++;
        if (x >= curr) {
          break;
        }
      }

      const score = l * r * t * b;
      maxScore = Math.max(maxScore, score);
    }
  }

  return maxScore;
};

export { Task1, Task2 };
