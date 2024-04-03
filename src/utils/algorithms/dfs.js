import { Stack } from '../structures/Stack'
import { getNeighbors } from './getNeighbors'

/*** 
 *  JavaScript no soporta una gran pila de recursividad, por lo que se debe usar un stack
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
    const visitedGrid = Array(grid.length).fill().map(() => Array(grid.length).fill(false))
    const visited = []
    const stack = new Stack()
    stack.push(start_node)
    while(!stack.isEmpty()){
        const node = stack.pop()
        if(node.col === end_node.col && node.row === end_node.row){
            return {path: [...visited], visitedNodesInOrder: [...visited]}
        }
        if(!visitedGrid[node.row][node.col]){
            visited.push(node)
            visitedGrid[node.row][node.col] = true
            const neighbors = getNeighbors(grid, node.row,node.col)
            for(const neighbor of neighbors){
                stack.push(neighbor)
            }
        }
    }
    return {path: [], visitedNodesInOrder: [...visited]}
}