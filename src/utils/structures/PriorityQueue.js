class PriorityQueue{
    constructor(){
        this.heap = [];
    }

    enqueue(node){
        this.heap.push(node);
        this.bubbleUp();
    }
    dequeue(){
        const min = this.heap[0]
        const end = this.heap.pop()
        if(this.heap.length > 0){
            this.heap[0] = end
            this.bubbleDown()
        }
        return min
    }

    bubbleUp(){
        let index = this.heap.length - 1
        while(index > 0){
            let element = this.heap[index]
            let parentIndex = Math.floor((index - 1) / 2)
            let parent = this.heap[parentIndex]
            if(parent.priority <= element.priority) break
            this.heap[index] = parent
            this.heap[parentIndex] = element
            index = parentIndex
        }
    }

    peek(){
        return this.heap[0]
    }

    bubbleDown(){
        let index = 0
        let length = this.heap.length
        const node = peek()
        while(true){
            let leftChild, rightChild = null
            let leftChildIndex = index * 2 + 1
            let rightChildIndex = index * 2 + 2
            let swap = null
            if(leftChildIndex < length){
                leftChild = this.heap[leftChildIndex]
                if(leftChild.priority < this.heap[index].priority){
                    swap = leftChildIndex
                }
            }
            if(rightChildIndex < length){
                rightChild = this.heap[rightChildIndex]
                if((swap === null && rightChild.priority < this.heap[index].priority) || (swap !== null && rightChild.priority < leftChild.priority)){
                    swap = rightChildIndex
                }
            }
            if(swap === null) break
            this.heap[index] = this.heap[swap]
            this.heap[swap] = node
            index = swap
        }
    }
}

export default PriorityQueue