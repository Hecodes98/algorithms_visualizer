import React, { useState, useEffect } from 'react'
import { dijkstra } from '../utils/algorithms/dijkstra';
import { Node } from "./Node"

export function TableMatrix() {

    const [matrix, setMatrix] = useState([])
    const [mouseIsPressed, setMousePress] = useState(false);
    const NUM_ROWS = 20;
    const NUM_COLS = 20;
    const TABLE_SIZE = NUM_COLS * 40
    const TABLE_CLASS = `w-[${TABLE_SIZE}px]`
    const INIT_POS = [0, 7]
    const END_POS = [15, 16]

    function createNode(row, col) {
        return {
            row,
            col,
            isWall: false,
            priority: INIT_POS[0] === row && INIT_POS[1] === col ? 0 : Infinity,
            predecessor: null
        }
    }

    function getNewGridWithToggledWall(row, col) {
        const tempGrid = [...matrix]
        const node = tempGrid[row][col]
        const newNode = {
            ...node,
            isWall: !node.isWall,
        }
        tempGrid[row][col] = newNode
        return tempGrid
    }

    function findShortestPath() {
        const startNode = matrix[INIT_POS[0]][INIT_POS[1]]
        const endNode = matrix[END_POS[0]][END_POS[1]]
        const path = dijkstra(matrix, startNode, endNode)
        console.log(path)
    }

    function handleClick(row, col) {
        const tempGrid = getNewGridWithToggledWall(row, col)
        setMatrix(tempGrid)
    }

    function onMouseEnter(row, col) {
        if (!mouseIsPressed) return
        handleClick(row, col)
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

    console.log(matrix)

    return (
        <div className={`${TABLE_CLASS} my-0 mx-auto`}>
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
                                    handleClick(node.row, node.col)
                                    setMousePress(true)
                                }}
                                handleMouseUp={() => {
                                    setMousePress(false)
                                }}
                                handleMouseEnter={() => onMouseEnter(node.row, node.col)}
                                isInit={INIT_POS[0] === node.row && INIT_POS[1] === node.col}
                                isEnd={END_POS[0] === node.row && END_POS[1] === node.col}
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