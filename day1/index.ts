import { readFileSync } from 'fs';


const readInput = () => {
    const data = readFileSync(`${__dirname}/input.txt`, 'utf8');
    return data.split('\n')
}

const Task1 = () => {
    const data = readInput();
    const aggregatedData = [0]
    let idx = 0
    data.forEach((line) => {
        if (line === '') {
            idx++;
            aggregatedData[idx] = 0;
            return;
        }

        aggregatedData[idx] += parseInt(line);
    })

    return Math.max(...aggregatedData);
}

const Task2 = () => {
    const data = readInput();
    const aggregatedData = [0]
    let idx = 0
    data.forEach((line) => {
        if (line === '') {
            idx++;
            aggregatedData[idx] = 0;
            return;
        }

        aggregatedData[idx] += parseInt(line);
    })

    const sortedData = aggregatedData.sort().reverse();
    return sortedData[0] + sortedData[1] + sortedData[2];
    
}



export {Task1, Task2}

