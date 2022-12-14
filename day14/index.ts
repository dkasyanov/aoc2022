interface Pair {
	x: number;
	y: number;
}

const parseInput = (input: string[]) => {
	input.sort((a, b) => Number(a.split(',')[0]) - Number(b.split(',')[0]))
	let minX = Number(input[0].split(',')[0]);
	let maxX = 0;
	let maxY = 0;

	const pairs: Pair[][] = input.map(line => line.split(' -> ').map(p => {
		const x = Number(p.split(',')[0]);
		const y = Number(p.split(',')[1]);
		
		minX = Math.min(minX, x);
		maxX = Math.max(maxX, x);
		maxY = Math.max(y, maxY);
		return {x, y}
	}))

	return {
		pairs,
		minX,
		maxX,
		maxY
	}
}


const generateField = (pairs: Pair[][])


const Task1 = (input: string[]) => {
	const {pairs, minX, maxX, maxY} = parseInput(input)
	console.log({pairs, minX, maxX, maxY})
};

const Task2 = (input: string[]) => {
};

export { Task1, Task2 };
