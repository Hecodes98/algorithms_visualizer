export function selectionSort(array){
    let minorIdx, currentIdx, idx = 0
    const animations = []
    while(idx < array.length){
        minorIdx = idx
        currentIdx = idx + 1
        while(currentIdx < array.length){
            if(array[currentIdx] < array[minorIdx]){
                minorIdx = currentIdx
            }
            currentIdx++
        }
        swap(array, idx, minorIdx)
        idx++
    }
    return array
}

function swap(array, left, right){
    const temp = array[left]
    array[left] = array[right]
    array[right] = temp
}