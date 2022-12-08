const Task1 = (input: string[]) => {
  const aggregatedData = [0];
  let idx = 0;
  input.forEach((line) => {
    if (line === "") {
      idx++;
      aggregatedData[idx] = 0;
      return;
    }

    aggregatedData[idx] += parseInt(line);
  });

  return Math.max(...aggregatedData);
};

const Task2 = (input: string[]) => {
  const aggregatedData = [0];
  let idx = 0;
  input.forEach((line) => {
    if (line === "") {
      idx++;
      aggregatedData[idx] = 0;
      return;
    }

    aggregatedData[idx] += parseInt(line);
  });

  const sortedData = aggregatedData.sort().reverse();
  return sortedData[0] + sortedData[1] + sortedData[2];
};

export { Task1, Task2 };
