const isPairsFullyOverlapping = (a: string, b: string) => {
	const pair1 = a.split('-').map((n) => parseInt(n));
	const pair2 = b.split('-').map((n) => parseInt(n));

	if (pair1[0] >= pair2[0] && pair1[1] <= pair2[1]) {
		return true;
	}

	if (pair2[0] >= pair1[0] && pair2[1] <= pair1[1]) {
		return true;
	}

	return false;
};

const isPairsPartialOverlapping = (a: string, b: string) => {
	const pair1 = a.split('-').map((n) => parseInt(n));
	const pair2 = b.split('-').map((n) => parseInt(n));

	if (pair1[0] >= pair2[0] && pair1[0] <= pair2[1]) {
		return true;
	}

	if (pair1[1] >= pair2[0] && pair1[1] <= pair2[1]) {
		return true;
	}

	if (pair2[0] >= pair1[0] && pair2[0] <= pair1[1]) {
		return true;
	}

	if (pair2[1] >= pair1[0] && pair2[1] <= pair1[1]) {
		return true;
	}

	return false;
};

const Task1 = (input: string[]) => {
	return input
		.map((line) => {
			const [pair1, pair2] = line.split(',');
			return isPairsFullyOverlapping(pair1, pair2) ? 1 : 0;
		})
		.reduce((acc, curr) => acc + curr, 0);
};

const Task2 = (input: string[]) => {
	return input
		.map((line) => {
			const [pair1, pair2] = line.split(',');
			return isPairsPartialOverlapping(pair1, pair2) ? 1 : 0;
		})
		.reduce((acc, curr) => acc + curr, 0);
};

export { Task1, Task2 };
