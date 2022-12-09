const nameMapping = {
	A: 'R',
	B: 'P',
	C: 'S',
	X: 'R',
	Y: 'P',
	Z: 'S',
};

const pointsMapping = {
	R: 1,
	P: 2,
	S: 3,
};

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

		case 'S':
			if (a === 'P') {
				return 6 + pointsMapping[b];
			}
			return pointsMapping[b];

		case 'P':
			if (a === 'R') {
				return 6 + pointsMapping[b];
			}
			return pointsMapping[b];
	}
};

const getRoundPointsByStrategy = (a: string, b: string): number => {
	switch (`${b}${a}`) {
		case 'XR':
			return pointsMapping['S'];
		case 'XS':
			return pointsMapping['P'];
		case 'XP':
			return pointsMapping['R'];
		case 'ZR':
			return 6 + pointsMapping['P'];
		case 'ZS':
			return 6 + pointsMapping['R'];
		case 'ZP':
			return 6 + pointsMapping['S'];
		case 'YR':
		case 'YS':
		case 'YP':
			return 3 + pointsMapping[a];
	}
};

const Task1 = (input: string[]) => {
	return input
		.map((item: string) => {
			const [p1, p2] = item.split(' ').map((x) => nameMapping[x]);
			return getRoundPoints(p1, p2);
		})
		.reduce((acc, curr) => acc + curr, 0);
};

const Task2 = (input: string[]) => {
	return input
		.map((item: string) => {
			const choices = item.split(' ');
			const p1 = nameMapping[choices[0]];

			return getRoundPointsByStrategy(p1, choices[1]);
		})
		.reduce((acc, curr) => acc + curr, 0);
};

export { Task1, Task2 };
