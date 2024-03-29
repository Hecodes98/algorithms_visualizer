import PriorityQueue from './priorityQueue';

function getNeighbors(grid, row, col){
    const d4x = [0, 1, 0, -1]
    const d4y = [-1, 0, 1, 0]
    const numRows = matrix.length
    const numCols = matrix[0].length
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

export function dijkstra(grid, start_node, end_node){
    const numRows = matrix.length
    const numCols = matrix[0].length
    const distances = Array.from({length: numRows}, () => Array.from({length: numCols}, () => Infinity))
    const predecessors = Array.from({length: numRows}, () => Array.from({length: numCols}, () => null))
    const pq = PriorityQueue()
    distances[start_node.row][start_node.col] = 0
    pq.enqueue(start_node)
    while(pq.heap.length > 0){
        const {row, col, priority, isAWall} = pq.dequeue()
        if(priority > distances[row][col]) continue;
        if(row === end_node.row && col === end_node.col) return getPath(predecessors, end_node)
        const neighbors = getNeighbors(grid, row, col)
        for(const [neighborRow, neighborCol, weight] of neighbors){
            const distance = distances[row][col] + weight
            if(distance < distance[neighborRow][neighborCol]){
                //End of the day, we want to update the distance and the predecessor
            }

        }
    }   


}
