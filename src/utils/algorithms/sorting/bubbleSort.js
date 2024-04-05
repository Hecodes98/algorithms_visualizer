export function bubbleSort(array){
    const animations = [];
    let n = array.length;
    let swapped = false;
    do{
        swapped = false;
        for(let i=0; i<n-1; i++){
            if(array[i] > array[i+1]){
                animations.push([i, i+1, array[i], array[i+1]]);
                let temp = array[i];
                array[i] = array[i+1];
                array[i+1] = temp;
                swapped = true;
            }
        }
        n--;
    }while(swapped);
    return animations;
}