import { Node } from "./Node.js"

export class Queue{
    constructor(){
        this.head = null
        this.tail = null
    }

    enqueue(value){
        if(this.head === null){
            const element = new Node(value)
            this.head = element
            this.tail = element
        }else{
            const element = new Node(value)
            this.tail.next = element
            element.prev = this.tail
            this.tail = element
        }
    }

    dequeue(){
        if(this.head === null){
            return null
        }
        const element = this.head
        if(this.head === this.tail){
            this.head = null
            this.tail = null
        }else{
            this.head = this.head.next
            this.head.prev = null
        }
        return element.value
    }

    isEmpty(){
        return this.head === null
    }

    peek(){
        return this.head
    }

    getTail(){
        return this.tail
    }

}