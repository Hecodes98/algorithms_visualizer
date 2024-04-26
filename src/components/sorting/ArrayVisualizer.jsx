import React from 'react'
import { useState, useEffect } from 'react'

import { Element } from './Element'
import { Slider } from './Slider'

import { bubbleSort } from '../../utils/algorithms/sorting/bubbleSort'
import { selectionSort } from '../../utils/algorithms/sorting/selectionSort'
import { quickSort } from '../../utils/algorithms/sorting/quickSort'

import { SelectAlgorithm } from '../SelectAlgorithm';


const OPTIONS = ['bubbleSort', 'selectionSort', 'quickSort']



export const ArrayVisualizer = () => {
    const [array, setArray] = useState([])
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(undefined)
    const [animations, setAnimations] = useState([])
    const [prevPicked, setPrevPicked] = useState(null)
    const [arraySize, setArraySize] = useState(30)
    const [isSorting, setIsSorting] = useState(false)

    const generateRandomArray = () => {
        const randomArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100 + 1))
        setArray(randomArray)
    }

    const sortArray = () => { 
        let tempArray = [...array]
        const animationsSteps = sortAlgorithm(tempArray)
        if(animationsSteps === undefined) return
        setIsSorting(true)
        setAnimations(animationsSteps)
    }

    function sortAlgorithm(array) {
        switch (selectedAlgorithm) {
            case 'bubbleSort':
                return bubbleSort(array)
            case 'selectionSort':
                return selectionSort(array)
            case 'quickSort':
                return quickSort(array)
            case undefined:
                alert('Selecciona un algoritmo de ordenamiento')
                break;
            default:
                break;
        }
    }

    useEffect(() => { 
        if(animations === undefined || animations.length === 0 ) return
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
                setIsSorting(false)
                clearInterval(timer)
            }
        }, 200) 
        return () => clearInterval(timer)
    }, 
    [animations])

    useEffect(() => {
        if(array.length === 0) return
        generateRandomArray()
    }, [arraySize]);

    return(
        <div className={`w-[1020px] h-[600px] mt-4 mx-auto flex flex-col justify-center items-center 
                        ${array.length === 0 ? 'bg-slate-300/50':''}`}>
            <SelectAlgorithm 
                selectedAlgorithm={selectedAlgorithm} 
                setSelectedAlgorithm={setSelectedAlgorithm} 
                options={OPTIONS}/>
            {!isSorting &&

                <Slider
                    arraySize={arraySize}
                    setArraySize={setArraySize}
                />
            
            }
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
                {(!isSorting && array.length > 0) && (
                    <button
                        type="button" 
                        onClick={sortArray}
                        className="mx-1 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sort</button>
                )}
            </div>
        </div>
    )
}