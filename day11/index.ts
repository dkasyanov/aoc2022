interface Monkey {
	id: number;
	items: number[];
	processed: number;
	divisor: number;
	operation(x: number): number;
	test: (x: number) => number;
}

const parseInput = (input: string[]): Monkey[] => {
	const monkeys: Monkey[] = [];
	for (const sString of input.join('\n').split('Monkey ').map((x) => x.trim())) {
		if (!sString.length) {
			continue;
		}
		const id = parseInt(sString[0]);
		const elements = sString.split('\n');
		const monkey: Monkey = {
			id,
			items: elements[1]?.split(': ')[1].split(', ').map((x) => parseInt(x)),
			processed: 0,
			divisor: parseInt(elements[3].split('divisible by ')[1]),
			operation(x: number) {
				this.processed++;
				const [op, val] = elements[2].split('old ')[1].split(' ');
				const num = parseInt(val) || x;

				switch (op) {
					case '+':
						return x + num;
					case '*':
						return x * num;
					case '-':
						return x - num;
					case '/':
						return x / num;
				}
				return x;
			},
			test: (x: number) => {
				const value = parseInt(elements[3].split('divisible by ')[1]);
				const trueDest = parseInt(elements[4].split('monkey ')[1]);
				const falseDest = parseInt(elements[5].split('monkey ')[1]);

				if (x % value === 0) {
					return trueDest;
				}
				return falseDest;
			},
		};
		monkeys.push(monkey);
	}

	return monkeys;
};

const Task1 = (input: string[]) => {
	const monkeys = parseInput(input);

	for (let round = 0; round < 20; round++) {
		monkeys.forEach((monkey, _, arr) => {
			while (monkey.items.length != 0) {
				const item = monkey.items.shift();
				if (item) {
					let newValue = monkey.operation(item);
					newValue = Math.floor(newValue / 3);
					const monkeyToGetItem = monkey.test(newValue);
					arr[monkeyToGetItem].items.push(newValue);
				}
			}
		});
	}

	monkeys.sort((a, b) => b.processed - a.processed);
	return monkeys[0].processed * monkeys[1].processed;
};

const Task2 = (input: string[]) => {
	const monkeys = parseInput(input);
	const superModulo = monkeys.reduce((a, c) => a * c.divisor, 1);

	for (let round = 0; round < 10000; round++) {
		monkeys.forEach((monkey, _, arr) => {
			while (monkey.items.length != 0) {
				const item = monkey.items.shift();
				if (item) {
					let newValue = monkey.operation(item);
					newValue = Math.trunc(newValue % superModulo);
					const monkeyToGetItem = monkey.test(newValue);
					arr[monkeyToGetItem].items.push(newValue);
				}
			}
		});
	}

	monkeys.sort((a, b) => b.processed - a.processed);
	return monkeys[0].processed * monkeys[1].processed;
};

export { Task1, Task2 };
