const Task1 = (input: string[]) => {
	let visible = 0;

	const rows = input.map((line) => line.split('').map((x) => parseInt(x)));
	const columns = rows[0].map((_, idx) => rows.map((row) => row[idx]));
	const frame = (rows.length + rows[0].length - 2) * 2;

	for (let i = 1; i < rows.length - 1; i++) {
		for (let j = 1; j < columns.length - 1; j++) {
			if (
				Math.max(...rows[i].slice(0, j)) < rows[i][j] ||
				Math.max(...rows[i].slice(j + 1, rows[i].length)) < rows[i][j] ||
				Math.max(...columns[j].slice(0, i)) < rows[i][j] ||
				Math.max(...columns[j].slice(i + 1, columns[j].length)) < rows[i][j]
			) {
				visible++;
			}
		}
	}

	return visible + frame;
};

const Task2 = (input: string[]) => {
	const rows = input.map((line) => line.split('').map((x) => parseInt(x)));
	const columns = rows[0].map((_, idx) => rows.map((row) => row[idx]));
	let maxScore = 0;

	for (let i = 1; i < rows.length - 1; i++) {
		for (let j = 1; j < rows[0].length - 1; j++) {
			const curr = rows[i][j];

			let l = 0,
				r = 0,
				t = 0,
				b = 0;

			for (const x of rows[i].slice(0, j).reverse()) {
				l++;
				if (x >= curr) {
					break;
				}
			}

			for (const x of rows[i].slice(j + 1, rows[i].length)) {
				r++;
				if (x >= curr) {
					break;
				}
			}

			for (const x of columns[j].slice(0, i).reverse()) {
				t++;
				if (x >= curr) {
					break;
				}
			}

			for (const x of columns[j].slice(i + 1, columns[j].length)) {
				b++;
				if (x >= curr) {
					break;
				}
			}

			maxScore = Math.max(maxScore, l * r * t * b);
		}
	}

	return maxScore;
};

export { Task1, Task2 };
