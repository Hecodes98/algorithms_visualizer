export function selectionSort(array){
    let minorIdx, currentIdx, idx = 0
    const animations = []
    while(idx < array.length){
        minorIdx = idx
        currentIdx = idx + 1
        while(currentIdx < array.length){
            if(array[currentIdx] < array[minorIdx]){
                animations.push([currentIdx, minorIdx, array[minorIdx], array[currentIdx]])
                minorIdx = currentIdx
            }
            currentIdx++
        }
        animations.push([idx, minorIdx, array[idx], array[minorIdx]])
        swap(array, idx, minorIdx)
        idx++
    }
    return animations
}

function swap(array, left, right){
    const temp = array[left]
    array[left] = array[right]
    array[right] = temp
}