import PriorityQueue from './priorityQueue';


export function dijkstra(grid, start_node, end_node){
    const numRows = matrix.length
    const numCols = matrix[0].length
    const distances = Array.from({length: numRows}, () => Array.from({length: numCols}, () => Infinity))
    const predecessors = Array.from({length: numRows}, () => Array.from({length: numCols}, () => null))
    const pq = PriorityQueue()
    distances[start_node.row][start_node.col] = 0
    pq.enqueue(start_node)
    while(pq.heap.length > 0){
        const {row, col, priority} = pq.dequeue()
        if(priority > distances[row][col]) continue;
        if(row === end_node.row && col === end_node.col) return getPath(predecessors, end_node)
        const neighbors = getNeighbors(grid, row, col)
    }   


}
