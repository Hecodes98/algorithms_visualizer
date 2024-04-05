export const Slider = ({arraySize, setArraySize}) => {
    return(
        <>
            <label htmlFor="steps-range" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Select Array Size</label>
            <p className="mb-4 text-xl">{arraySize}</p>
            <input id="steps-range" onChange={e => setArraySize(e.target.value)} type="range" min="0" max="70" value={arraySize} step="5" className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"></input>
        </>
    )
}