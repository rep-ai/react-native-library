// @flow
import { StyleSheet } from 'react-native'

import { elevationToShadowProps } from '../util'

const elevation = 24
export const triangleSize = 20
export const triangleVisualOffset = 1
export const triangleBorderRadius = 3

export default StyleSheet.create({
    innerContainer: {
        elevation,
        ...elevationToShadowProps(elevation),
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 36,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '70%',
        maxWidth: '80%',
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 21,
        textAlign: 'center',
        backgroundColor: 'transparent',
        color: '#444',
    },

    title: {
        fontSize: 32,
        marginBottom: 18,
    },

    triangle: {
        position: 'absolute',
        width: triangleSize * 2,
        height: triangleSize * 2,
        backgroundColor: 'white',
        transform: [{ rotate: '45deg' }],
    },

    top: {
        top: -triangleSize,
        borderTopLeftRadius: triangleBorderRadius,
    },

    bottom: {
        bottom: -triangleSize,
        borderBottomRightRadius: triangleBorderRadius,
    },

    left: {
        left: -triangleSize,
        borderBottomLeftRadius: triangleBorderRadius,
    },

    right: {
        right: -triangleSize,
        borderTopRightRadius: triangleBorderRadius,
    },

    none: {},
})
