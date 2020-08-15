module.exports.getNextPosition = function(prevNumber, currentNumber, nextNumber, numberOfElements, direction) {
    let prev = prevNumber
    let curr = currentNumber
    let next = nextNumber
    
    switch (direction) {
        case 'right': {
            if (next === numberOfElements - 1) {
                curr = next
                prev = next - 1
                next = 0
            } else if (curr === numberOfElements - 1) {
                prev = curr
                curr = 0
                next = curr + 1
            } else {
                curr += 1
                prev = curr - 1
                next = curr + 1
            }
            return { prevNumber: prev, currentNumber: curr, nextNumber: next }
        }
        case 'left': {
            if (prev === numberOfElements - 1) {
                curr = prev
                prev = curr - 1
                next = 0
            } else if (curr === 1) {
                curr = 0
                prev = numberOfElements - 1
                next = curr + 1
            } else {
                curr -= 1
                prev = curr - 1
                next = curr + 1
            }
            return { prevNumber: prev, currentNumber: curr, nextNumber: next }
        }
    }
}

