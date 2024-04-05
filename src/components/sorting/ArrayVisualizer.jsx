import React from 'react'
import { useState, useEffect } from 'react'

import { Element } from './Element'

import { bubbleSort } from '../../utils/algorithms/sorting/bubbleSort'
import { selectionSort } from '../../utils/algorithms/sorting/selectionSort'

export const ArrayVisualizer = () => {
    const [array, setArray] = useState([])
    const [animations, setAnimations] = useState([])
    const [prevPicked, setPrevPicked] = useState(null)

    const generateRandomArray = () => {
        const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100 + 1))
        setArray(randomArray)
    }

    const sortArray = () => { //TODO: Implement selection sort visualization
        let tempArray = [...array]
        //tempArray = selectionSort(tempArray)
        //console.log(tempArray)
        const animations = bubbleSort(tempArray)
        setAnimations(animations)
    }

    useEffect(() => { //TODO: Check the actual approach for visualization and scale it for this can work for any sorting algorithm
        if(animations.length === 0) return
        const timer = setInterval(() => {
            const [move, ...animationsCopy] = animations
            const [i, j, value1, value2] = move
            const tempArray = [...array]
            if(prevPicked !== null){
                tempArray[prevPicked[0]].isPicked = false
                tempArray[prevPicked[1]].isPicked = false
            }
            tempArray[i] = {value:value2, isPicked:true}
            tempArray[j] = {value:value1, isPicked:true}
            setArray(tempArray)
            setAnimations(animationsCopy)
            setPrevPicked([i,j]) 
            if(animationsCopy.length === 0){ 
                setPrevPicked(null)
                clearInterval(timer)
            }
        }, 70) 
        return () => clearInterval(timer)
    }, 
    [animations])

    return(
        <div className={`w-[1020px] h-[600px] mt-4 mx-auto flex flex-col justify-center items-center 
                        ${array.length === 0 ? 'bg-slate-300/50':''}`}>
            <div className={`h-full flex justify-center items-end ${array.length > 0 ?'block':'hidden'}`}>
            {
                array.map((value, idx) => (
                    <Element 
                        key={idx} 
                        value={value.value || value}
                        width={array.length*80 >= 1000 ? `${1020/array.length}px`:'5rem'} 
                        isPicked={value.isPicked || false}
                    />
                    ))
                }
            </div>
            <div className='mt-4'>
                <button 
                    type="button"
                    onClick={generateRandomArray} 
                    className="mx-1 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                        Generate random array
                </button>
                {array.length > 0 && (
                    <button
                        type="button" 
                        onClick={sortArray}
                        className="mx-1 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sort</button>
                )}
            </div>
        </div>
    )
}