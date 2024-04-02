export const ButtonTableMatrix = ({isSorting, findShortestPath, clearGrid}) => {
    return (
        <div className="flex justify-center space-x-4">
            {!isSorting ?
                <button 
                    onClick={() => {findShortestPath()}}
                    type="button" 
                    className={`text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>
                    Sort
            </button>
            :
            <button 
                onClick={()=>{clearGrid()}}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Clear
            </button>
            }    
        </div>
    )
}