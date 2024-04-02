import { Stack } from '../structures/Stack'
function getNeighbors(grid, {row, col}){
    const d4x = [0, 1, 0, -1]
    const d4y = [-1, 0, 1, 0]
    const numRows = grid.length
    const numCols = grid[0].length
    const neighbors = []
    for(let i = 0; i < 4; i++){
        const newRow = row + d4x[i]
        const newCol = col + d4y[i]
        if(newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols && !grid[newRow][newCol].isWall){
            neighbors.push({row: newRow, col: newCol})
        }
    }
    return neighbors
}
/*** 
 * 
export function dfs(grid, start_node, end_node, visited=null){
    if(visited === null){
        visited = new Set()
    }
    const {row, col} = start_node
    if(row === end_node.row && col === end_node.col){
        return {path: [...visited], visitedNodesInOrder: [...visited]}
    }
    visited.add({row, col})
    const neighbors = getNeighbors(grid, row, col)
    for(const neighbor of neighbors){
        if(visited.has(neighbor)) continue
        dfs(grid, neighbor, end_node, visited)
    }
    return {path: [], visitedNodesInOrder: [...visited]}
}
*/
export function dfs(grid, start_node, end_node){
    const visited = new Set()
    const stack = new Stack()
    stack.push(start_node)
    while(!stack.isEmpty()){
        const node = stack.pop()
        console.log(node)
        if(node.col === end_node.col && node.row === end_node.row){
            console.log("sali")
            return {path: [...visited], visitedNodesInOrder: [...visited]}
        }
        console.log(visited.has(node))
        if(!visited.has(node.toString())){
            visited.add(node.toString())
            const neighbors = getNeighbors(grid, node)
            for(const neighbor of neighbors){
                stack.push(neighbor)
            }
        }
    }
    console.log("sali outside")
    return {path: [], visitedNodesInOrder: [...visited]}
}