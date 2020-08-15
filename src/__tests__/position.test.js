const position = require('../position')

const getNextPosition = position.getNextPosition

describe('position', () => {
    const numberOfElements = 4

    it('Test function for returning next position with random data', () => {
        position.getNextPosition = jest.fn()
        position.getNextPosition(1, 2, 3, 4, 'right')
        expect(position.getNextPosition).toBeCalled()
        expect(position.getNextPosition).toHaveReturned()
    })

    it('Test the positions after tick in direction to the right at non-border values', () => {
        const prevNumber = 3,
            currentNumber = 0,
            nextNumber = 1

        expect(getNextPosition(prevNumber, currentNumber, nextNumber, numberOfElements, 'right')).toStrictEqual({
            prevNumber: 0,
            nextNumber: 2,
            currentNumber: 1,
        })
    })

    it('Test the positions on the pre-last image of slider after tick in direction to the right', () => {
        const prevNumber = 1,
            currentNumber = 2,
            nextNumber = 3

        expect(getNextPosition(prevNumber, currentNumber, nextNumber, numberOfElements, 'right')).toStrictEqual({
            prevNumber: 2,
            nextNumber: 0,
            currentNumber: 3,
        })
    })

    it('Test the positions on the last image of slider after tick in direction to the right', () => {
        const prevNumber = 2,
            currentNumber = 3,
            nextNumber = 0

        expect(getNextPosition(prevNumber, currentNumber, nextNumber, numberOfElements, 'right')).toStrictEqual({
            prevNumber: 3,
            nextNumber: 1,
            currentNumber: 0,
        })
    })

    it('Test the positions at first image after tick in direction to the left', () => {
        const prevNumber = 3,
            currentNumber = 0,
            nextNumber = 1

        expect(getNextPosition(prevNumber, currentNumber, nextNumber, numberOfElements, 'left')).toStrictEqual({
            prevNumber: 2,
            nextNumber: 0,
            currentNumber: 3,
        })
    })

    it('Test the positions after tick in direction to the left at non-border values', () => {
        const prevNumber = 2,
            currentNumber = 3,
            nextNumber = 0

        expect(getNextPosition(prevNumber, currentNumber, nextNumber, numberOfElements, 'left')).toStrictEqual({
            prevNumber: 1,
            nextNumber: 3,
            currentNumber: 2,
        })
    })
})
