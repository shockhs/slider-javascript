import { getNextPosition } from './utils'

export default class PositionsController {
    constructor(numberOfElements) {
        this.numberOfElements = numberOfElements
        this.currentNumber = 0
    }

    getPrev = () => (this.currentNumber === 0 ? this.numberOfElements - 1 : this.currentNumber - 1)

    getCurrent = () => this.currentNumber

    getNext = () => (this.currentNumber === this.numberOfElements - 1 ? 0 : this.currentNumber + 1)

    goNext = () => {
        this.currentNumber = getNextPosition(
            { prevNumber: this.getPrev(), currentNumber: this.currentNumber, nextNumber: this.getNext() },
            this.numberOfElements,
            'right'
        )
    }

    goPrev = () => {
        this.currentNumber = getNextPosition(
            { prevNumber: this.getPrev(), currentNumber: this.currentNumber, nextNumber: this.getNext() },
            this.numberOfElements,
            'left'
        )
    }
}
