import { readFileSync } from 'fs';

const readInput = () => {
    const data = readFileSync(`${__dirname}/input.txt`, 'utf8');
    return data.split('\n')
}

const toSlidingWindow = (input: string[], size: number) => {
    return Array.from(
        {length: input.length - (size - 1)},
        (_, index) => input.slice(index, index+size)
    )
}

const Task1 = () => {
    const input = readInput()[0];

    const windowSize = 4;
    let result = 0;
    toSlidingWindow(input.split(''), windowSize).forEach((v, idx, arr) => {
        const set = new Set(v);
        if (set.size === windowSize) {
            result = idx + windowSize;
            arr.length = idx + 1; //exit from the loop
        }
    });

    return result;
}

const Task2 = () => {
    const input = readInput()[0];

    const windowSize = 14;
    let result = 0;
    toSlidingWindow(input.split(''), windowSize).forEach((v, idx, arr) => {
        const set = new Set(v);
        if (set.size === windowSize) {
            result = idx + windowSize;
            arr.length = idx + 1; //exit from the loop
        }
    });

    return result;
}

export { Task1, Task2 }
