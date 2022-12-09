interface Point {
    x: number;
    y: number;
}

const distance = (a: Point, b: Point): number => {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

const moveAtoB = (a: Point, b: Point) => {
    if (b.x === a.x) {
        a.y += (b.y > a.y) ? 1 : -1;
        return;
    }

    if (b.y === a.y) {
        a.x += (b.x > a.x) ? 1 : -1;
        return;
    }

    a.x += (b.x > a.x) ? 1 : -1;
    a.y += (b.y > a.y) ? 1 : -1;
}


const Task1 = (input: string[]) => {
    const commands = input.map(line => line.split(' '));
    const head: Point = { x: 0, y: 0 }
    const tail: Point = { x: 0, y: 0 };
    let visitedPoints = new Set(['0.0'])

    for (const [cmd, num] of commands) {
        switch (cmd) {
            case 'U':
                for (const _ of Array(parseInt(num)).keys()) {
                    head.y++;
                    if (distance(head, tail) >= 2) {
                        moveAtoB(tail, head);
                        visitedPoints.add(`${tail.x}.${tail.y}`);
                    }
                }
                break;
            case 'D':
                for (const _ of Array(parseInt(num)).keys()) {
                    head.y--;
                    if (distance(head, tail) >= 2) {
                        moveAtoB(tail, head);
                        visitedPoints.add(`${tail.x}.${tail.y}`);
                    }
                }
                break;
            case 'L':
                for (const _ of Array(parseInt(num)).keys()) {
                    head.x--;
                    if (distance(head, tail) >= 2) {
                        moveAtoB(tail, head);
                        visitedPoints.add(`${tail.x}.${tail.y}`);
                    }
                }
                break;
            case 'R':
                for (const _ of Array(parseInt(num)).keys()) {
                    head.x++
                    if (distance(head, tail) >= 2) {
                        moveAtoB(tail, head);
                        visitedPoints.add(`${tail.x}.${tail.y}`);
                    }
                }
                break;
        }
    }

    return visitedPoints.size
}

const Task2 = (input: string[]) => {
    const commands = input.map(line => line.split(' '));
    const rope: Point[] = Array.from({ length: 10 }, () => ({ x: 0, y: 0 }));
    let visitedPoints = new Set(['0.0'])

    for (const [cmd, num] of commands) {
        switch (cmd) {
            case 'U':
                for (const _ of Array(parseInt(num)).keys()) {
                    rope[0].y++;
                    for (let i = 1; i < rope.length; i++) {
                        if (distance(rope[i - 1], rope[i]) >= 2) {
                            moveAtoB(rope[i], rope[i - 1])
                        }
                        visitedPoints.add(`${rope[rope.length - 1].x}.${rope[rope.length - 1].y}`);
                    }
                }
                break;
            case 'D':
                for (const _ of Array(parseInt(num)).keys()) {
                    rope[0].y--;
                    for (let i = 1; i < rope.length; i++) {
                        if (distance(rope[i - 1], rope[i]) >= 2) {
                            moveAtoB(rope[i], rope[i - 1])

                        }
                        visitedPoints.add(`${rope[rope.length - 1].x}.${rope[rope.length - 1].y}`);
                    }
                }
                break;
            case 'L':
                for (const _ of Array(parseInt(num)).keys()) {
                    rope[0].x--;
                    for (let i = 1; i < rope.length; i++) {
                        if (distance(rope[i - 1], rope[i]) >= 2) {
                            moveAtoB(rope[i], rope[i - 1])
                        }
                        visitedPoints.add(`${rope[rope.length - 1].x}.${rope[rope.length - 1].y}`);
                    }
                }
                break;
            case 'R':
                for (const _ of Array(parseInt(num)).keys()) {
                    rope[0].x++
                    for (let i = 1; i < rope.length; i++) {
                        if (distance(rope[i - 1], rope[i]) >= 2) {
                            moveAtoB(rope[i], rope[i - 1])
                        }
                        visitedPoints.add(`${rope[rope.length - 1].x}.${rope[rope.length - 1].y}`);
                    }
                }
                break;

        }
    }

    return visitedPoints.size

};

export { Task1, Task2 };
