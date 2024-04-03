import React, { useState, useEffect } from 'react'
import { dijkstra } from '../utils/algorithms/dijkstra';
import { dfs } from '../utils/algorithms/dfs';
import { bfs } from '../utils/algorithms/bfs';
import { Node } from "./Node"
import { ButtonTableMatrix } from './ButtonTableMatrix';
import { SelectAlgorithm } from './SelectAlgorithm';

const INIT_POS = [0, 7]
const END_POS = [15, 16]
const NUM_ROWS = 20;
const NUM_COLS = 20;

export function TableMatrix() {

    const [selectedAlgorithm, setSelectedAlgorithm] = useState(undefined)

    const [matrix, setMatrix] = useState([])
    const [mouseIsPressed, setMousePress] = useState(false)
    const [shortestPath, setShortestPath] = useState([])
    const [visitedInOrder, setVisitedInOrder] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const TABLE_SIZE = NUM_COLS * 40
    const TABLE_CLASS = `w-[${TABLE_SIZE}px]`
    const DISABLED_BUTTON = isSearching
        ? 'disabled:opacity-0 cursor-not-allowed pointer-events-none'
        : ''

    function createNode(row, col) {
        return {
            row,
            col,
            isWall: false,
            priority: INIT_POS[0] === row && INIT_POS[1] === col ? 0 : Infinity,
            predecessor: null
        }
    }


    function getNewGridWithUpdatedNode({ row, col }, updates) {
        const tempGrid = [...matrix]
        const node = tempGrid[row][col]
        const newNode = {
            ...node,
            ...updates,
        };
        tempGrid[row][col] = newNode
        return tempGrid
    }

    function getNewGridWithShortestPath({ row, col }) {
        return getNewGridWithUpdatedNode({ row, col }, { isPath: true })
    }

    function getNewGridWithToggledWall({ row, col }) {
        return getNewGridWithUpdatedNode({ row, col }, { isWall: !matrix[row][col].isWall })
    }

    function getNewGridWithVisitedInOrder({ row, col }) {
        return getNewGridWithUpdatedNode({ row, col }, { isVisited: true })
    }

    function executeFunctionOnGrid() {
        setIsSearching(true)
        const startNode = matrix[INIT_POS[0]][INIT_POS[1]]
        const endNode = matrix[END_POS[0]][END_POS[1]]
        const { path, visitedNodesInOrder } = findShortestPath(matrix, startNode, endNode)
        setVisitedInOrder(visitedNodesInOrder)
        setShortestPath(path)
    }

    function findShortestPath(matrix, startNode, endNode) {
        switch (selectedAlgorithm) {
            case 'dijkstra':
                return dijkstra(matrix, startNode, endNode)
            case 'dfs':
                return dfs(matrix, startNode, endNode)
            case 'bfs':
                return bfs(matrix, startNode, endNode);
            case undefined:
                alert('Selecciona un algoritmo de búsqueda')
                setIsSearching(false)
                break;
            default:
                break;
        }
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

    function updateGrid(path, setPath, updateFunctionArgs, timer) {
        const [node, ...tempPath] = [...path]
        const tempGrid = getNewGridWithUpdatedNode(node, updateFunctionArgs)
        setMatrix(tempGrid)
        setPath(tempPath)
        if (tempPath.length === 0) {
            clearInterval(timer)
            setPath([])
        }
    }

    function clearGrid() {
        initGrid()
        setIsSearching(false)
        setShortestPath([])
        setVisitedInOrder([])
    }

    useEffect(() => {
        if (shortestPath.length > 0 && visitedInOrder.length < 1) {
            const timer = setInterval(() => {
                updateGrid(shortestPath, setShortestPath, { isPath: true }, 50);
            }, 30);
            return () => clearInterval(timer);
        }
        if (visitedInOrder.length > 0) {
            const timer = setInterval(() => {
                updateGrid(visitedInOrder, setVisitedInOrder, { isVisited: true }, 0);
            }, 0);
            return () => clearInterval(timer);
        }
    }, [shortestPath, visitedInOrder]);

    useEffect(() => {
        initGrid()
    }, []);
    return (
        <div className={`w-[800px] my-0 mx-auto`}>
            <SelectAlgorithm
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
            />
            {
                matrix.map((row, rowIdx) => (
                    <div className='grid grid-cols-20 auto-rows-max gap-x-0' key={rowIdx}>
                        {row.map((node, colIdx) => (
                            <Node
                                key={colIdx}
                                node={node}
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
                            />
                        ))}
                    </div>
                ))
            }
            <div className='m-2 flex place-content-center'>
                <ButtonTableMatrix
                    isSorting={isSearching}
                    findShortestPath={executeFunctionOnGrid}
                    clearGrid={clearGrid}
                />
            </div>
        </div>
    )
}