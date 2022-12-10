const Task1 = (input: string[]) => {
    let sthrenth = 0;
    let cycle = 1;
    let x = 1;
    const cyclesToProcess = [20, 60, 100, 140, 180, 220];

    input.forEach((line) => {
        const [cmd, val] = line.split(' ');
        if (cmd === 'noop') {
            cycle++;
            if (cyclesToProcess.includes(cycle)) {
                sthrenth += cycle * x;
            }
        } else {
            cycle++;
            if (cyclesToProcess.includes(cycle)) {
                sthrenth += cycle * x;
            }
            cycle++;
            x += parseInt(val);
            if (cyclesToProcess.includes(cycle)) {
                sthrenth += cycle * x;
            }
        }
    })
    return sthrenth;

};

const Task2 = (input: string[]) => {
    let spritePosition = 1;
    let cycle = 0;
    let x = 1;
    let currLine = 0
    const cyclesToProcess = [40, 80, 120, 160, 200, 240];
    const result = Array.from({length: 6}, ()=>Array.from({length: 40},() => '.'));

    input.forEach((line) => {
        const [cmd, val] = line.split(' ');
        if (cmd === 'noop') {
            cycle++;
            if (cycle - (40 * currLine) -1 >= spritePosition -1 && cycle - (40 * currLine)-1 <= spritePosition +1){
                result[currLine][cycle - (40 * currLine)-1] = '#'
            }
            if (cyclesToProcess.includes(cycle)) {
                currLine++;
            }
        } else {
            cycle++;
            if (cycle - (40 * currLine) -1 >= spritePosition -1 && cycle - (40 * currLine)-1 <= spritePosition +1){
                result[currLine][cycle - (40 * currLine)-1] = '#'
            }
            if (cyclesToProcess.includes(cycle)) {
                currLine++;
            }
            cycle++;
            if (cycle - (40 * currLine) -1 >= spritePosition -1 && cycle - (40 * currLine)-1 <= spritePosition +1){
                result[currLine][cycle - (40 * currLine)-1] = '#'
            }
            x += parseInt(val);
            if (cyclesToProcess.includes(cycle)) {
                currLine++
            }
            spritePosition = x
        }
    })

   return result.reduce((a, c) => a + '\n' + c.join(''), '')
};

export { Task1, Task2 };
