import React, { useState, useEffect } from 'react'
import { dijkstra } from '../utils/algorithms/dijkstra';
import { Node } from "./Node"

export function TableMatrix() {

    const [matrix, setMatrix] = useState([])
    const [mouseIsPressed, setMousePress] = useState(false);
    const [shortestPath, setShortestPath] = useState([])
    const NUM_ROWS = 20;
    const NUM_COLS = 20;
    const TABLE_SIZE = NUM_COLS * 40
    const TABLE_CLASS = `w-[${TABLE_SIZE}px]`
    const INIT_POS = [0, 7]
    const END_POS = [15, 16]

    //TODO: Implement the visualization of the path

    function createNode(row, col) {
        return {
            row,
            col,
            isWall: false,
            priority: INIT_POS[0] === row && INIT_POS[1] === col ? 0 : Infinity,
            predecessor: null
        }
    }


    function getNewGridWithUpdatedNode({row, col}, updates) {
        const tempGrid = [...matrix]
        const node = tempGrid[row][col]
        const newNode = {
            ...node,
            ...updates,
        };
        tempGrid[row][col] = newNode
        return tempGrid
    }

    function getNewGridWithShortestPath({row,col}) {
        return getNewGridWithUpdatedNode({row, col}, {isPath: true})
    }

    function getNewGridWithToggledWall({row, col}) {
        return getNewGridWithUpdatedNode({row, col}, {isWall: !matrix[row][col].isWall})
    }

    function findShortestPath() {
        const startNode = matrix[INIT_POS[0]][INIT_POS[1]]
        const endNode = matrix[END_POS[0]][END_POS[1]]
        const {path, visitedNodesInOrder} = dijkstra(matrix, startNode, endNode)
        setShortestPath(path.reverse())
    }

    function handleClick(node) {
        const tempGrid = getNewGridWithToggledWall(node)
        setMatrix(tempGrid)
    }

    function onMouseEnter(node) {
        if (!mouseIsPressed) return
        handleClick(node)
    }

    function initGrid() {
        const tempMatrix = []
        for (let row = 0; row < NUM_ROWS; row++) {
            let currentRow = []
            for (let col = 0; col < NUM_COLS; col++) {
                currentRow.push(createNode(row, col))
            }
            tempMatrix.push(currentRow)
        }
        setMatrix(tempMatrix)
    }

    useEffect(() => {
        initGrid()
    }, []);

    useEffect(() => {
        if(shortestPath.length > 0){
            const timer = setInterval(() => {
                const tempShortestPath = [...shortestPath]
                const node = tempShortestPath.pop()
                const tempGrid = getNewGridWithShortestPath(node)
                setMatrix(tempGrid)
                setShortestPath(tempShortestPath)
                if(tempShortestPath.length === 0){
                    clearInterval(timer)
                    setShortestPath([])
                }
            }, 50);
            return () => clearInterval(timer)
        }
    }, [shortestPath]);

    console.log(shortestPath)

    return (
        <div className={`w-[800px] my-0 mx-auto`}>
            {
                matrix.map((row, rowIdx) => (
                    <div className='grid grid-cols-20' key={rowIdx}>
                        {row.map((node, colIdx) => (
                            <Node
                                key={colIdx}
                                col={node.col}
                                row={node.row}
                                isWall={node.isWall}
                                handleMouseDown={() => {
                                    handleClick(node)
                                    setMousePress(true)
                                }}
                                handleMouseUp={() => {
                                    setMousePress(false)
                                }}
                                handleMouseEnter={() => onMouseEnter(node)}
                                isInit={INIT_POS[0] === node.row && INIT_POS[1] === node.col}
                                isEnd={END_POS[0] === node.row && END_POS[1] === node.col}
                                isPath={node.isPath}
                            />
                        ))}
                    </div>
                ))
            }
            <div className='m-2 flex place-content-center'>
                <button 
                    onClick={() => {findShortestPath()}}
                    type="button" 
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Sort
                </button>
            </div>
        </div>
    )
}