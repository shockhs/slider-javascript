module.exports.getNextPosition = function (positions, numberOfElements, direction) {
    let { prevNumber, currentNumber, nextNumber } = positions

    switch (direction) {
        case 'right': {
            if (nextNumber === numberOfElements - 1) {
                currentNumber = nextNumber
                prevNumber = nextNumber - 1
                nextNumber = 0
            } else if (currentNumber === numberOfElements - 1) {
                prevNumber = currentNumber
                currentNumber = 0
                nextNumber = currentNumber + 1
            } else {
                currentNumber += 1
                prevNumber = currentNumber - 1
                nextNumber = currentNumber + 1
            }
            return { prevNumber, currentNumber, nextNumber }
        }
        case 'left': {
            if (prevNumber === numberOfElements - 1) {
                currentNumber = prevNumber
                prevNumber = currentNumber - 1
                nextNumber = 0
            } else if (currentNumber === 1) {
                currentNumber = 0
                prevNumber = numberOfElements - 1
                nextNumber = currentNumber + 1
            } else {
                currentNumber -= 1
                prevNumber = currentNumber - 1
                nextNumber = currentNumber + 1
            }
            return { prevNumber, currentNumber, nextNumber }
        }
    }
}
