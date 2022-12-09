const readInput = (dayNumber: string): string[] => {
	const data = Deno.readTextFileSync(`./day${dayNumber}/input.txt`);
	return data.split('\n');
};

const main = async () => {
	const dayNumber = Deno.args[0];
	const module = await import(`./day${dayNumber}/index.ts`);

	if (module.Task1 !== undefined) {
		console.log('Task 1: ', module.Task1(readInput(dayNumber)));
	}

	if (module.Task2 !== undefined) {
		console.log('Task 2: ', module.Task2(readInput(dayNumber)));
	}
};

main();
