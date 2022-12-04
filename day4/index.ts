import { readFileSync } from 'fs';

const readInput = () => {
    const data = readFileSync(`${__dirname}/input.txt`, 'utf8');
    return data.split('\n')
}


const isPairsFullyOverlapping = (a: string, b: string) => {
    const pair1 = a.split('-').map(n => parseInt(n));
    const pair2 = b.split('-').map(n => parseInt(n));

    if (pair1[0] >= pair2[0] && pair1[1] <= pair2[1]) {
        return true
    }

    if (pair2[0] >= pair1[0] && pair2[1] <= pair1[1]) {
        return true
    }

    return false
}

const isPairsPartialOverlapping = (a: string, b: string) => {
    const pair1 = a.split('-').map(n => parseInt(n));
    const pair2 = b.split('-').map(n => parseInt(n));

    if (pair1[0] >= pair2[0] && pair1[0] <= pair2[1]) {
        return true
    }

    if (pair1[1] >= pair2[0] && pair1[1] <= pair2[1]) {
        return true
    }

    if (pair2[0] >= pair1[0] && pair2[0] <= pair1[1]) {
        return true
    }

    if (pair2[1] >= pair1[0] && pair2[1] <= pair1[1]) {
        return true
    }

    return false
}

const Task1 = () => {
    return readInput().map(line => {
        const pairs = line.split(',');
        return isPairsFullyOverlapping(pairs[0], pairs[1]) ? 1 : 0
    }).reduce((acc, curr) => acc + curr, 0)
}

const Task2 = () => {
    return readInput().map(line => {
        const pairs = line.split(',');
        return isPairsPartialOverlapping(pairs[0], pairs[1]) ? 1 : 0
    }).reduce((acc, curr) => acc + curr, 0)
}

export { Task1, Task2 }