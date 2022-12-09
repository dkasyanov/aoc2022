const Task1 = (input: string[]) => {
	return input
		.map((line): number => {
			const letters = line.split('');
			const group1 = letters.slice(0, letters.length / 2);
			const group2 = letters.slice(letters.length / 2);
			const matchingLetter = group1.filter((value) => group2.includes(value))[0];

			if (matchingLetter === matchingLetter.toUpperCase()) {
				return matchingLetter.charCodeAt(0) - 38;
			}
			return matchingLetter.charCodeAt(0) - 96;
		})
		.reduce((acc, cur) => acc + cur, 0);
};

const Task2 = (input: string[]) => {
	const priorities = [];
	const chunkSize = 3;
	for (let i = 0; i < input.length; i += chunkSize) {
		const chunk = input.slice(i, i + chunkSize).map((line) => line.split(''));
		const matchingLetter = chunk.reduce((a, b) => a.filter((c) => b.includes(c)))[0];

		if (matchingLetter === matchingLetter.toUpperCase()) {
			priorities.push(matchingLetter.charCodeAt(0) - 38);
		} else {
			priorities.push(matchingLetter.charCodeAt(0) - 96);
		}
	}

	return priorities.reduce((acc, cur) => acc + cur, 0);
};

export { Task1, Task2 };
