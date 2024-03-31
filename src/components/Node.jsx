import React, { useState } from 'react';

export function Node({row, col, isWall, handleMouseDown, handleMouseUp, handleMouseEnter, isInit, isEnd, isPath}){
    
    const wallColorClass = isWall
    ?  'bg-slate-500'
    : isInit
    ? 'bg-red-600'
    : isEnd
    ? 'bg-green-600'
    : isPath
    ? 'bg-teal-500 animate-pulse'
    : ''

    return(
        <div 
            id={`id-${row}-${col}`} 
            className={`size-10 border-2 ${wallColorClass}`}
            onMouseDown={() => handleMouseDown(row,col)} 
            onMouseUp={() => handleMouseUp()}
            onMouseEnter={() => handleMouseEnter(row,col)}
        />
    )
}
