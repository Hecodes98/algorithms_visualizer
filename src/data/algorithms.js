export const sortingAlgorithms = {
    bubbleSort: {
        name: 'Bubble Sort',
        description: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
        complexity: 'O(n^2)',
    },
    selectionSort: {
        name: 'Selection Sort',
        description: 'Selection Sort is a simple sorting algorithm that divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted.',
        complexity: 'O(n^2)',
    },
}

export const pathFindingAlgorithms = {
    dijkstra: {
        name: 'Dijkstra',
        description: 'Dijkstra is an algorithm that finds the shortest path between nodes in a graph.',
        complexity: 'O(V^2)',
    },
    dfs: {
        name: 'Depth First Search',
        description: 'Depth First Search is an algorithm for traversing or searching tree or graph data structures.',
        complexity: 'O(V+E)',
    },
    bfs:{
        name: 'Breadth First Search',
        description: 'Breadth First Search is an algorithm for traversing or searching tree or graph data structures.',
        complexity: 'O(V+E)',
    }
}
// Path: src/data/paths.js