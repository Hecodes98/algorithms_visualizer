import { Queue } from "../../structures/Queue.js";
import { getNeighbors } from './getNeighbors.js';

export function bfs(grid, start_node, end_node){
    const visitedGrid = Array(grid.length).fill().map(() => Array(grid.length).fill(false))
    const visited = []
    const queue = new Queue()
    queue.enqueue(start_node)
    while(!queue.isEmpty()){
        const node = queue.dequeue()
        console.log(node)
        if(node.row === end_node.row && node.col === end_node.col){
            return {path: [...visited], visitedNodesInOrder: [...visited]}
        }
        if(!visitedGrid[node.row][node.col]){
            console.log("entre")
            visited.push(node)
            visitedGrid[node.row][node.col] = true
            const neighbors = getNeighbors(grid, node.row, node.col)
            console.log(neighbors)
            for(const neighbor of neighbors){
                queue.enqueue(neighbor)
            }
        }
    }
    return {path: [], visitedNodesInOrder: [...visited]}
}