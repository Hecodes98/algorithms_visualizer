import { ArrayVisualizer } from "../components/sorting/ArrayVisualizer"

export const SortingPage = () => {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mt-4">Sorting Algorithms</h1>
            <p className="text-lg mt-2">Visualize sorting algorithms in action</p>
            <ArrayVisualizer />
        </div>
    )
}