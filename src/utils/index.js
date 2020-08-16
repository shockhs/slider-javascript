export const getNextPosition = (positions, numberOfElements, direction) => {
    let { prevNumber, currentNumber, nextNumber } = positions

    switch (direction) {
        case 'right': {
            if (nextNumber === numberOfElements - 1) {
                currentNumber = nextNumber
            } else if (currentNumber === numberOfElements - 1) {
                currentNumber = 0
            } else {
                currentNumber += 1
            }
            return currentNumber
        }
        case 'left': {
            if (prevNumber === numberOfElements - 1) {
                currentNumber = prevNumber
            } else if (currentNumber === 1) {
                currentNumber = 0
            } else {
                currentNumber -= 1
            }
            return currentNumber
        }
        default:
            throw new Exeption('Wrong direction')
    }
}
