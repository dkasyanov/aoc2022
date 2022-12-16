import { time } from "console";

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
		return { x, y }
	}))

	return {
		pairs,
		minX,
		maxX,
		maxY
	}
}


const generateField = (pairsArr: Pair[][], minX: number, maxX: number, maxY: number): string[][] => {
	const field = Array.from({ length: maxY + 1 }, () => Array.from({ length: maxX - minX + 1 }, () => '.'));
	for (const pairs of pairsArr) {
		for (let i = 0; i < pairs.length - 1; i++) {
			const start = pairs[i];
			const end = pairs[i + 1];

			if (start.x === end.x) {
				while (true) {
					// console.log('Y', {start, x: start.x - minX})
					field[start.y][start.x - minX] = '#';
					if (start.y === end.y) break;
					start.y += (start.y < end.y) ? 1 : -1;
				}
			}

			if (start.y === end.y) {
				while (true) {
					// console.log('X', {start, x: start.x - minX})
					field[start.y][start.x - minX] = '#';
					if (start.x === end.x) break;
					start.x += (start.x < end.x) ? 1 : -1;
				}
			}
		}
	}

	return field;
}


const canMove = (field: string[][], start: Pair): Pair | null => {
	const down = { y: start.y + 1, x: start.x };
	const downLeft = { y: start.y + 1, x: start.x - 1 };
	const downRight = { y: start.y + 1, x: start.x + 1 };

	if (!['#', 'O'].includes(field[down.y][down.x])) {
		// console.log('down', { down })
		field[down.y][down.x] = 'O';
		field[start.y][start.x] = '.';
		return down
	}

	if (!['#', 'O'].includes(field[downLeft.y][downLeft.x])) {
		// console.log('downLeft', { downLeft })
		field[downLeft.y][downLeft.x] = 'O';
		field[start.y][start.x] = '.';
		return downLeft;
	}

	if (!['#', 'O'].includes(field[downRight.y][downRight.x])) {
		// console.log('downRight', { downRight })
		field[downRight.y][downRight.x] = 'O';
		field[start.y][start.x] = '.';
		return downRight;
	}

	return null;
}

const addFloor = (field: string[][], maxY: number) => {
	for (let i = 0; i < field[0].length; i++) {
		field[maxY + 2][i] = '#'
	}
}



const Task1 = (input: string[]) => {
	const { pairs, minX, maxX, maxY } = parseInput(input)
	const field = generateField(pairs, minX, maxX, maxY + 1)
	// console.log(field.map(x => x.join('')).join('\n'))
	const startPoint: Pair = { y: 0, x: 500 - minX };

	let nextMove = {x: startPoint.x, y: startPoint.y}
	let count = 0;
	while(true) {
		// console.log('---------')
		nextMove = canMove(field, nextMove);
		// console.log(field.map(x => x.join('')).join('\n'))
		// console.log(nextMove)
		if (!nextMove) {
			nextMove = {x: startPoint.x, y: startPoint.y};
			count++;
			// console.log('---------')
			// console.log(field.map(x => x.join('')).join('\n'))
		} else {
			if (nextMove.y > maxY || nextMove.x < 0 || nextMove.x > maxX - minX) {
				break
			}
		}
	}

	// console.log(field.map(x => x.join('')).join('\n'))
	return count;
};

const Task2 = (input: string[]) => {
	const { pairs, minX, maxX, maxY } = parseInput(input)
	const field = generateField(pairs, minX - maxY, maxX + maxY, maxY + 3)
	addFloor(field, maxY);

	const startPoint: Pair = { y: 0, x: 500 - minX + maxY };
	let nextMove = {x: startPoint.x, y: startPoint.y}
	let count = 0;
	let noNextMovesInRow = 0;
	while( true) {
		nextMove = canMove(field, nextMove);
		if (!nextMove) {
			noNextMovesInRow++;
			if (noNextMovesInRow === 3) {
				break;
			}
			nextMove = {x: startPoint.x, y: startPoint.y};
			count++;
			// console.log('---------')
			// console.clear()
			// console.log(field.map(x => x.join('')).join('\n'))
		} else {
			noNextMovesInRow = 0;
		}
	}

	// console.log(field.map(x => x.join('')).join('\n'))
	return count;


};

export { Task1, Task2 };
