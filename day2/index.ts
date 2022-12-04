import { readFileSync } from 'fs';


const nameMapping = {
    'A': 'R',
    'B': 'P',
    'C': 'S',
    'X': 'R',
    'Y': 'P',
    'Z': 'S'
}

const pointsMapping = {
    'R': 1,
    'P': 2,
    'S': 3
}




const readInput = () => {
    const data = readFileSync(`${__dirname}/input.txt`, 'utf8');
    return data.split('\n')
}

const getRoundPoints = (a: string, b: string): number => {
    if (a === b) {
        return 3 + pointsMapping[b];
    }

    switch (b) {
        case 'R':
            if (a === 'S') {
                return 6 + pointsMapping[b];
            }
            return pointsMapping[b];
            break;

        case 'S':
            if (a === 'P') {
                return 6 + pointsMapping[b];
            }
            return pointsMapping[b];
            break;

        case 'P':
            if (a === 'R') {
                return 6 + pointsMapping[b];
            }
            return pointsMapping[b];
            break;
    }
}

const getRoundPointsByStrategy = (a: string, b: string): number => {
    switch (b) {
        case 'Y':
            return 3 + pointsMapping[a]
            break;
        case 'X':
            if (a === 'R') { return pointsMapping['S'] }
            if (a === 'S') { return pointsMapping['P'] }
            if (a === 'P') { return pointsMapping['R'] }
            break;
        case 'Z':
            if (a === 'R') { return 6 + pointsMapping['P'] }
            if (a === 'S') { return 6 + pointsMapping['R'] }
            if (a === 'P') { return 6 + pointsMapping['S'] }
            break;
    }
}

const Task1 = () => {
    const data = readInput();

    return data.map((item: string) => {
        const choices = item.split(' ');
        const p1 = nameMapping[choices[0]];
        const p2 = nameMapping[choices[1]];

        return getRoundPoints(p1, p2);
    }).reduce((acc, curr) => acc + curr, 0);
}

const Task2 = () => {
    const data = readInput();

    return data.map((item: string) => {
        const choices = item.split(' ');
        const p1 = nameMapping[choices[0]];

        return getRoundPointsByStrategy(p1, choices[1]);
    }).reduce((acc, curr) => acc + curr, 0);

}

export { Task1, Task2 }