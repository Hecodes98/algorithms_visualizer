export function quickSort(array){
    const animations = [];
    quickSortHelper(array, 0, array.length-1, animations);
    return animations;
}

const quickSortHelper = (array, low, high, animations) => {
    if(low < high){
        let pi = partition(array, low, high, animations);
        quickSortHelper(array, low, pi-1, animations);
        quickSortHelper(array, pi+1, high, animations);
    }
}

const partition = (array, low, high, animations) => {
    let pivot = array[high]; //Tomamos el ultimo elemento como pivote en cada subilista
    let i = low - 1;
    for(let j=low; j<high; j++){
        if(array[j] < pivot){
            i++;
            animations.push([i, j, array[i], array[j]]);
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    animations.push([i+1, high, array[i+1], array[high]]);
    let temp = array[i+1];
    array[i+1] = array[high];
    array[high] = temp;
    return i+1;
}