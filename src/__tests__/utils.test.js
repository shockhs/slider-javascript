import { getNextPosition } from '../utils'

describe('utils/getNextPosition', () => {
    const numberOfElements = 4

    it('Returns the position after tick in direction to the right at non-border values', () => {
        const prevNumber = 3,
            currentNumber = 0,
            nextNumber = 1

        expect(getNextPosition({ prevNumber, currentNumber, nextNumber }, numberOfElements, 'right')).toBe(1)
    })

    it('Returns the position on the pre-last image of slider after tick in direction to the right', () => {
        const prevNumber = 1,
            currentNumber = 2,
            nextNumber = 3

        expect(getNextPosition({ prevNumber, currentNumber, nextNumber }, numberOfElements, 'right')).toBe(3)
    })

    it('Returns the position on the last image of slider after tick in direction to the right', () => {
        const prevNumber = 2,
            currentNumber = 3,
            nextNumber = 0

        expect(getNextPosition({ prevNumber, currentNumber, nextNumber }, numberOfElements, 'right')).toBe(0)
    })

    it('Returns the position at first image after tick in direction to the left', () => {
        const prevNumber = 3,
            currentNumber = 0,
            nextNumber = 1

        expect(getNextPosition({ prevNumber, currentNumber, nextNumber }, numberOfElements, 'left')).toBe(3)
    })

    it('Returns the position after tick in direction to the left at non-border values', () => {
        const prevNumber = 2,
            currentNumber = 3,
            nextNumber = 0

        expect(getNextPosition({ prevNumber, currentNumber, nextNumber }, numberOfElements, 'left')).toBe(2)
    })
})
