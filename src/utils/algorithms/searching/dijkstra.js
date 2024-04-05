import PriorityQueue from '../../structures/PriorityQueue.js';
import { getNeighbors } from './getNeighbors.js';

function getPath(grid, end_node) {
    const path = []
    let currentRow = end_node.row
    let currentCol = end_node.col
    while (grid[currentRow][currentCol].predecessor !== null) {
        path.push({row: currentRow, col: currentCol})
        const {row, col} = grid[currentRow][currentCol].predecessor
        currentRow = row
        currentCol = col    
    }
    path.push({row: currentRow, col: currentCol})
    return path.reverse()

}

export function dijkstra(grid, start_node, end_node){
    const numRows = grid.length
    const numCols = grid[0].length
    const visited = []
    const pq = new PriorityQueue()
    pq.enqueue(start_node)
    while(pq.heap.length > 0){
        const {row, col, priority, isAWall} = pq.dequeue()
        visited.push({row,col})
        if(priority > grid[row][col].priority) continue;
        if(row === end_node.row && col === end_node.col) return {path: getPath(grid, end_node), visitedNodesInOrder: visited}
        const neighbors = getNeighbors(grid, row, col)
        for(const neighbor of neighbors){
            const distance = grid[row][col].priority + neighbor.priority
            if(distance < grid[neighbor.row][neighbor.col].priority){
                grid[neighbor.row][neighbor.col].priority = distance
                grid[neighbor.row][neighbor.col].predecessor = {row, col}
                pq.enqueue(grid[neighbor.row][neighbor.col])
            }
        }
    }   
    return {path: [], visitedNodesInOrder: visited}
}
