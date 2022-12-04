import { readFileSync } from 'fs';

const readInput = () => {
    const data = readFileSync(`${__dirname}/input.txt`, 'utf8');
    return data.split('\n')
}

const Task1 = () => {

}

const Task2 = () => {

}

export { Task1, Task2 }
