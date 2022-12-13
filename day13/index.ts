interface Data {
	left: any[];
	right: any[];
}

const parseInput = (input: string[]): Data[] => {
	const data: Data[] = [];
	for (let i = 0; i < input.length; i += 3) {
		const left = Array.from(JSON.parse(input[i]));
		const right = Array.from(JSON.parse(input[i + 1]));
		data.push({ left, right });
	}
	return data;
};

const parseInputWithoutDividers = (input: string[]) => {
	const data = [];
	for (let i = 0; i < input.length; i++) {
		if (input[i] !== '') {
			data.push(Array.from(JSON.parse(input[i])))
		}
	}
	return data;
};

const compareArrays = (left: any, right: any):  boolean | undefined => {
	for (let i = 0; i < Math.max(left.length, right.length); i++) {
		if (typeof left[i] === "undefined" && typeof right[i] !== "undefined") {
			return true
		}

		if (typeof left[i] !== "undefined" && typeof right[i] === "undefined") {
			return false
		}

		if (typeof left[i] === "number" && typeof right[i] === "number") {
			if (left[i] < right[i]) {
				return true;
			}

			if (left[i] > right[i]) {
				return false;
			}
		}

		if (typeof left[i] === "object" && typeof right[i] === "object") {
			const res = compareArrays(left[i], right[i]);
			if (res != undefined) {
				return res
			}
		}

		if (typeof left[i] === "number" && typeof right[i] !== "number") {
			const res = compareArrays([left[i]], right[i]);
			if (res != undefined) {
				return res
			}
		}

		if (typeof left[i] !== "number" && typeof right[i] === "number") {
			const res = compareArrays(left[i], [right[i]]);
			if (res != undefined) {
				return res
			}
		}

	}
};

const Task1 = (input: string[]) => {
	const data = parseInput(input);

	const r = data.map(({ left, right }, idx) => {
		return compareArrays(left, right) ? idx + 1 : 0;
	})
	return r.reduce((a, c) => a + c, 0);

	// 6420
};

const Task2 = (input: string[]) => {
	const data = parseInputWithoutDividers(input);
	data.push([[2]]);
	data.push([[6]]);

	data.sort((a, b) => {
		const res = compareArrays(a, b);
		if (res === true) {
			return -1;
		}
		if (res === false) {
			return 1
		}
		return 0;
	});

	const strData = data.map(x => JSON.stringify(x));
	return (strData.indexOf('[[2]]') + 1) * (strData.indexOf('[[6]]') + 1)
};

export { Task1, Task2 };
