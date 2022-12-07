import { readFileSync } from 'fs';

const readInput = () => {
    const data = readFileSync(`${__dirname}/input.txt`, 'utf8');
    return data.split('$ ').map(s => s.trim());
}

type FsNode = {
    isDir: boolean
    children?: Map<string, FsNode>
    parent?: FsNode
    name: string
    size: number
}

const parseInput = (input: string[]): FsNode => {
    const root: FsNode = { isDir: true, children: new Map(), parent: null, name: '/', size: 0 };
    let currentDir = root;

    input.forEach(line => {
        if (line.startsWith('cd')) {
            const [_, arg] = line.split(' ');
            if (arg === '..') {
                currentDir = currentDir.parent;
            } else if (arg === '/') {
                currentDir = root;
            } else {
                currentDir = currentDir.children.get(arg)
            }
        } else if (line.startsWith('ls')) {
            const parts = line.replace('ls\n', '').split('\n');
            parts.forEach(part => {
                if (part.startsWith('dir')) {
                    const [_, name] = part.split(' ');
                    const node: FsNode = { isDir: true, name: name, parent: currentDir, children: new Map(), size: 0}
                    currentDir.children.set(name, node);
                } else { // file
                    const [size, name] = part.split(' ');
                    const node: FsNode = { isDir: false, name: name, parent: currentDir, children: null, size: parseInt(size)}
                    currentDir.children.set(name, node);
                }

            })
        }
    })

    return root
}

const getDirSizes = (dir: FsNode, sizes: Map<string, number>) => {
    let size = 0;
    for(const [name, node] of dir.children) {
        if (node.isDir) {
            size += getDirSizes(node, sizes);
        } else {
            size += node.size;
        }
    }

    sizes.set(getFullPath(dir), size)
    return size
}

const getFullPath = (node: FsNode): string => {
    if (!node.parent) {
        return '/';
    }

    return (getFullPath(node.parent) + '/' + node.name).replace('//', '/')

}


const Task1 = () => {
    const input = parseInput(readInput());
    const sizes = new Map()
    getDirSizes(input, sizes)
    return Array.from(sizes.values()).filter(s => s < 100000).reduce((a,c) => a+c)

}

const Task2 = () => {
    const input = parseInput(readInput());
    const sizes = new Map()
    getDirSizes(input, sizes)

    const totalSize = sizes.get('/');
    const requiredFreeSpace = 30000000;
    const totalDiskSize = 70000000;
    const spaceToClean = Math.abs(totalDiskSize - totalSize - requiredFreeSpace)
    return Array.from(sizes.values()).filter(s => s >= spaceToClean).sort((a ,b) => a-b)[0]
}

export { Task1, Task2 }