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

const compareArrays = (left: any[], right: any[]): boolean => {
	console.log("start", { left, right });

	if (right.length === 0 && left.length !== 0) {
		return false;
	}

	if (left.length === 0 && right.length !== 0) {
		return true;
	}

	for (let i = 0; i < Math.min(left.length, right.length); i++) {
		let lItem = left[i];
		let rItem = right[i];

		// console.log({ lItem, rItem });

		if (typeof lItem === "number" && typeof rItem === "number") {
			console.log("numbers", { lItem, rItem });
			if (rItem < lItem) {
				return false;
			}

			if (lItem < rItem) {
				return true;
			}
		} else {
			console.log("obj", { lItem, rItem });
			if (typeof lItem === "number" || typeof rItem === "number") {
				// if (i !== 0) {
				// 	return false;
				// }

				if (typeof rItem === "number") {
					rItem = [rItem];
				}

				if (typeof lItem === "number") {
					lItem = [lItem];
				}
			}
            console.log("obj >>>", { lItem, rItem });
			const res = compareArrays(Array.from(lItem), Array.from(rItem));
			if (res === false) {
				return false;
			}
		}

		if (i + 1 === right.length && i + 1 !== left.length) {
			return false;
		}

		if (i + 1 === left.length && i + 1 !== right.length) {
			return true;
		}
	}
	return true;
};

const Task1 = (input: string[]) => {
	const data = parseInput(input);

	return data.map(({ left, right }, idx) => {
		console.log("--------------");
		console.log({ left, right });
		if (left.length > right.length) {
			// console.log("HERE");
			return 0;
		}
		return compareArrays(left, right) ? idx + 1 : 0;
	})
	//.reduce((a, c) => a + c, 0);

	// 1274 too low
	// 1536 wrong
};

const Task2 = (input: string[]) => {};

export { Task1, Task2 };
