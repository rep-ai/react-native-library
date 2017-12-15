// @flow
export type OrdinalSuffixResult = 'st' | 'nd' | 'rd' | 'th' | ''

export default (number: number): OrdinalSuffixResult => {
    if (typeof number !== 'number') {
        console.warn(
            `Warning: The function ordinalSuffix requires its first and only argument to be a number. \n`,
            `Instead it was provided the value ${number} which is a typeof ${typeof number}%c.`
        )

        return ''
    }

    const j = number % 10
    const k = number % 100

    if (j === 1 && k !== 11) {
        return 'st'
    }

    if (j === 2 && k !== 12) {
        return 'nd'
    }

    if (j === 3 && k !== 13) {
        return 'rd'
    }

    return 'th'
}
