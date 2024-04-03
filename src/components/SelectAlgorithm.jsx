import React from "react";

export function SelectAlgorithm({ selectedAlgorithm, setSelectedAlgorithm }) {
    return (
        <div className="flex flex-col justify-center m-8">
            <label htmlFor="algorithms" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select 
                name="Algorithm-Select" 
                id="algorithms"
                value={selectedAlgorithm}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e)=>setSelectedAlgorithm(e.target.value)}>
                    <option selected>Elije un algoritmo de busqueda</option>
                    <option value="dijkstra">dijkstra</option>
                    <option value="dfs">dfs</option>
                    <option value="bfs">bfs</option>
                </select>
        </div>
    )
}