import React, {useState, useEffect} from 'react'
import {Node} from "./Node"

export function TableMatrix(){

    const [matrix, setMatrix] = useState([])
    const [mouseIsPressed, setMousePress] = useState(false);
    const NUM_ROWS = 20;
    const NUM_COLS = 20;
    const TABLE_SIZE = NUM_COLS*40
    const INIT_POS = [0,7]
    const END_POS = [15,16]

    function createNode(row,col){
        return { 
            row,
            col,
            isWall: false,
            priority: INIT_POS[0] === row && INIT_POS[1] === col ? 0 : Infinity,
            predecessor: null
        }
    }

    function getNewGridWithToggledWall(row, col){
        const tempGrid = [...matrix]
        const node = tempGrid[row][col]
        const newNode = {
            ...node,
            isWall : !node.isWall,
        }
        tempGrid[row][col] = newNode
        return tempGrid
    }

    function handleClick(row, col){
        const tempGrid = getNewGridWithToggledWall(row, col)
        setMatrix(tempGrid)
    }

    function onMouseEnter(row, col){
        if(!mouseIsPressed) return
        handleClick(row, col)
    }

    function initGrid(){
        const tempMatrix = []
        for(let row = 0 ; row < NUM_ROWS ; row++){
            let currentRow = []
            for(let col = 0; col < NUM_COLS ; col++){
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

    return(
        <div className={`w-[${TABLE_SIZE}px] my-0 mx-auto`}>
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
                                handleMouseEnter={()=>onMouseEnter(node.row, node.col)}
                                isInit={INIT_POS[0] === node.row && INIT_POS[1] === node.col}
                                isEnd={END_POS[0] === node.row && END_POS[1] === node.col}
                            />
                        ))}
                    </div>
                    ))
            }
        </div>    
    )
}