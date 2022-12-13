interface Point {
	y: number;
	x: number;
}

const input2Maze = (input: string[]) => {
	const start: Point = { y: 0, x: 0 };
	const end: Point = { y: 0, x: 0 };
	const maze = input.map((line, lineIdx) => {
		if (line.includes('S')) start.y = lineIdx;
		if (line.includes('E')) end.y = lineIdx;
		return line.split('').map((char, charId) => {
			if (char === 'S') {
				start.x = charId;
				char = 'a';
			}

			if (char === 'E') {
				end.x = charId;
				char = 'z';
			}

			return char.charCodeAt(0);
		});
	});

	return {
		maze,
		start,
		end,
	};
};

function createGraph(maze: number[][]): Map<string, string[]> {
	const graph = new Map<string, string[]>();

	for (let i = 0; i < maze.length; i++) {
		for (let j = 0; j < maze[i].length; j++) {
			const current = maze[i][j];

			if (i > 0 && (maze[i - 1][j] - current === 1 || current >= maze[i - 1][j])) {
				addEdge(graph, `${i},${j}`, `${i - 1},${j}`);
			}

			if (j > 0 && (maze[i][j - 1] - current === 1 || current >= maze[i][j - 1])) {
				addEdge(graph, `${i},${j}`, `${i},${j - 1}`);
			}

			if (i < maze.length - 1 && (maze[i + 1][j] - current === 1 || current >= maze[i + 1][j])) {
				addEdge(graph, `${i},${j}`, `${i + 1},${j}`);
			}

			if (j < maze[i].length - 1 && (maze[i][j + 1] - current === 1 || current >= maze[i][j + 1])) {
				addEdge(graph, `${i},${j}`, `${i},${j + 1}`);
			}
		}
	}

	return graph;
}

const addEdge = (graph: Map<string, string[]>, current: string, neighbor: string) => {
	const curr = graph.get(current);
	if (curr) {
		curr.push(neighbor);
	} else {
		graph.set(current, [neighbor]);
	}
};

const findShortestPath = (graph: Map<string, string[]>, start: string, end: string): number | undefined => {
	let result;
	const queue = [{ node: start, step: 0 }];
	const visited = new Set();

	while (queue.length > 0) {
		const curr = queue.shift()!;

		if (visited.has(curr.node)) {
			continue;
		}
		visited.add(curr.node);

		if (curr.node === end) {
			result = curr.step;
		}

		const neighbors = graph.get(curr.node);
		if (neighbors) {
			neighbors.forEach((n) => queue.push({ node: n, step: curr.step + 1 }));
		}
	}

	return result;
};

const Task1 = (input: string[]) => {
	const { maze, start, end } = input2Maze(input);
	const startNode = `${start.y},${start.x}`;
	const endNode = `${end.y},${end.x}`;
	const graph = createGraph(maze);
	const path = findShortestPath(graph, startNode, endNode);
	return path;
};

const Task2 = (input: string[]) => {
	const { maze, start, end } = input2Maze(input);
	const startNodes = maze.map((row, rid) =>
		row.map((col, cid) => {
			if (col === 'a'.charCodeAt(0)) return `${rid},${cid}`;
		})
	).flat().filter((x) => x);
	const endNode = `${end.y},${end.x}`;
	const graph = createGraph(maze);

	const paths: number[] = [];
	for (const startNode of startNodes) {
		const res = findShortestPath(graph, startNode!, endNode);
		if (res) {
			paths.push(res);
		}
	}

	return Math.min(...paths);
};

export { Task1, Task2 };
