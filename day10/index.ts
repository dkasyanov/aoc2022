const Task1 = (input: string[]) => {
	let strength = 0;
	let cycle = 1;
	let x = 1;
	const cyclesToProcess = [20, 60, 100, 140, 180, 220];

	input.forEach((line) => {
		const [cmd, val] = line.split(' ');
		cycle++;
		if (cyclesToProcess.includes(cycle)) {
			strength += cycle * x;
		}
		if (cmd === 'addx') {
			cycle++;
			x += parseInt(val);
			if (cyclesToProcess.includes(cycle)) {
				strength += cycle * x;
			}
		}
	});
	return strength;
};

const Task2 = (input: string[]) => {
	let spritePosition = 1;
	let cycle = 0;
	let x = 1;
	let currLine = 0;
	const step = 40;
	const result = Array.from({ length: 6 }, () => Array.from({ length: step }, () => '.'));

	input.forEach((line) => {
		const [cmd, val] = line.split(' ');
		cycle++;
		if ([spritePosition - 1, spritePosition, spritePosition + 1].includes(cycle - (step * currLine) - 1)) {
			result[currLine][cycle - (step * currLine) - 1] = '#';
		}
		if (cycle % step === 0) {
			currLine++;
		}

		if (cmd === 'addx') {
			cycle++;
			if ([spritePosition - 1, spritePosition, spritePosition + 1].includes(cycle - (step * currLine) - 1)) {
				result[currLine][cycle - (step * currLine) - 1] = '#';
			}
			x += parseInt(val);
			if (cycle % step === 0) {
				currLine++;
			}
			spritePosition = x;
		}
	});

	return result.reduce((a, c) => a + '\n' + c.join(''), '');
};

export { Task1, Task2 };
