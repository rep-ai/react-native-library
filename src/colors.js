// @flow
const colors: {
    [key: string]: string
} = {
    main: '#D0554E',
    grey: '#444',
    text: '#666',
    lightGrey: '#777',
    lightestGrey: '#eee',
    lightMain: '#e5645e',
    blue: '#5CC5E8',
    middleGrey: '#C7C7CC',
    middleLightGrey: '#D7D7DC',
    facebookBlue: '#415DAE'
}

import theme from '../theme'
if (theme === 'ActiveMatch') {
    colors.main = '#9780af'
}

if (theme === 'Simpsons') {
    colors.main = '#FFD90F'
}
export default colors
