import { readFileSync, stat } from 'fs';
import { transpileModule } from 'typescript';

const readInput = () => {
    const data = readFileSync(`${__dirname}/input.txt`, 'utf8');
    return data.split('\n')
}


const parseInitialState = (input: string[]) => {
    const data = new Map<string, string[]>()
    
    input.reverse().forEach(line => {
        line.match(/.{1,4}/g).map(s => s.trim()).forEach((el, idx) => {
            el = el.replace('[', '').replace(']', '')
            if (el !== '') {
                if (data[idx+1]) {
                    data[idx+1].push(el)
                } else {
                    data[idx+1] = [el]
                }
            }
        })
    })

    return data
}


const Task1 = () => {
    const input = readInput();
    const state = parseInitialState(input.slice(0, 8))
    const instructions = input.slice(10)
    // console.log(instructions)

    instructions.forEach(line => {
        const match = line.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/);
        for (let i = 0; i < parseInt(match[1]); i++) {
            const el = state[match[2]].pop()
            state[match[3]].push(el)
        }
    })
    
    return Object.values(state).map(v => v[v.length - 1]).reduce((a,c) => a + c, '')
    //WHTLRMZRC

}

const Task2 = () => {
    const input = readInput();
    const state = parseInitialState(input.slice(0, 8))
    const instructions = input.slice(10)
    // console.log(instructions)

    instructions.forEach(line => {
        const match = line.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/);
        const crates = state[match[2]].slice(state[match[2]].length - parseInt(match[1]))
        state[match[2]].splice(state[match[2]].length - parseInt(match[1]))
        state[match[3]].push(...crates)
    })
    
    return Object.values(state).map(v => v[v.length - 1]).reduce((a,c) => a + c, '')
}

export { Task1, Task2 }
