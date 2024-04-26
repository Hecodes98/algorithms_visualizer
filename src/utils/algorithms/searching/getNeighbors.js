export function getNeighbors(grid, row, col){
    const d4x = [-1, 0, 1, 0]
    const d4y = [0, 1, 0, -1]
    const numRows = grid.length
    const numCols = grid[0].length
    const neighbors = []
    for(let i = 0; i < 4; i++){
        const newRow = row + d4x[i]
        const newCol = col + d4y[i]
        if(newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols && !grid[newRow][newCol].isWall){
            const newNode = {
                row: newRow,
                col: newCol,
                priority: grid[row][col].priority + 1
            };
            neighbors.push(newNode)
        }
    }
    return neighbors
}