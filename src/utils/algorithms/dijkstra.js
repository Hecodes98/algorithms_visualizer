import PriorityQueue from '../structures/PriorityQueue.js';

function getNeighbors(grid, row, col){
    const d4x = [0, 1, 0, -1]
    const d4y = [-1, 0, 1, 0]
    const numRows = grid.length
    const numCols = grid[0].length
    const neighbors = []
    for(let i = 0; i < 4; i++){
        const newRow = row + d4x[i]
        const newCol = col + d4y[i]
        if(newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols && !grid[newRow][newCol].isWall){
            neighbors.push({row: newRow, col: newCol, priority: grid[row][col].priority + 1})
        }
    }
    return neighbors
}

function getPath(predecessors, end_node) {
    const path = []
    let currentRow = end_node.row
    let currentCol = end_node.col
    while (predecessors[currentRow][currentCol] !== null) {
        path.push({row: currentRow, col: currentCol})
        const {row, col} = predecessors[currentRow][currentCol]
        currentRow = row
        currentCol = col    
    }
    path.push({row: currentRow, col: currentCol})
    return path.reverse()

}

export function dijkstra(grid, start_node, end_node){
    const numRows = grid.length
    const numCols = grid[0].length
    const distances = Array.from({length: numRows}, () => Array.from({length: numCols}, () => Infinity))
    const predecessors = Array.from({length: numRows}, () => Array.from({length: numCols}, () => null))
    const pq = new PriorityQueue()
    distances[start_node.row][start_node.col] = 0
    pq.enqueue(start_node)
    while(pq.heap.length > 0){
        const {row, col, priority, isAWall} = pq.dequeue()
        console.log(row,col)
        if(priority > distances[row][col]) continue;
        if(row === end_node.row && col === end_node.col) return getPath(predecessors, end_node)
        const neighbors = getNeighbors(grid, row, col)
        for(const neighbor of neighbors){
            const distance = distances[row][col] + neighbor.priority
            if(distance < distance[neighbor.row][neighbor.col]){
                distances[neighbor.row][neighbor.col] = distance
                predecessors[neighbor.row][neighbor.col] = {row, col}
                grid[neighbor.row][neighbor.col].priority = distance
                pq.enqueue(grid[neighbor.row][neighbor.col])
            }

        }
    }   
    return null
}
