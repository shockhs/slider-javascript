import { getNextPosition } from './utils'

export default class PositionsController {
    constructor(numberOfElements) {
        this.numberOfElements = numberOfElements
        this.nextNumber = 1
        this.prevNumber = this.numberOfElements - 1
        this.currentNumber = 0
    }

    getPrev = () => this.prevNumber

    getCurrent = () => this.currentNumber

    getNext = () => this.nextNumber

    goNext = () => {
        const positions = getNextPosition(
            { prevNumber: this.prevNumber, currentNumber: this.currentNumber, nextNumber: this.nextNumber },
            this.numberOfElements,
            'right'
        )
        this.prevNumber = positions.prevNumber
        this.currentNumber = positions.currentNumber
        this.nextNumber = positions.nextNumber
    }

    goPrev = () => {
        const positions = getNextPosition(
            { prevNumber: this.prevNumber, currentNumber: this.currentNumber, nextNumber: this.nextNumber },
            this.numberOfElements,
            'left'
        )
        this.prevNumber = positions.prevNumber
        this.currentNumber = positions.currentNumber
        this.nextNumber = positions.nextNumber
    }
}
