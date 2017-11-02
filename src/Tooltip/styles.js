// @flow
import { StyleSheet } from 'react-native'

import { elevationToShadowProps } from '../util'

const elevation = 24

export default StyleSheet.create({
    innerContainer: {
        elevation,
        ...elevationToShadowProps(elevation),
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 36,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '70%',
        maxWidth: '80%',
    },

    flex: {
        flex: 1,
    },

    title: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 12,
        color: '#333',
    },

    description: {
        fontSize: 21,
        textAlign: 'center',
        color: '#555',
    },

    top: {
        top: 1,
        width: 20,
        height: 20,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 20,
        borderBottomWidth: 20,
        borderLeftWidth: 20,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white',
        borderLeftColor: 'transparent',
    },

    bottom: {
        top: -1,
        width: 20,
        height: 20,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 0,
        borderLeftWidth: 20,
        borderTopColor: 'white',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },

    left: {
        left: 1,
        width: 20,
        height: 20,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 20,
        borderLeftWidth: 0,
        borderTopColor: 'transparent',
        borderRightColor: 'white',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },

    right: {
        left: -1,
        width: 20,
        height: 20,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 20,
        borderRightWidth: 0,
        borderBottomWidth: 20,
        borderLeftWidth: 20,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'white',
    },

    none: {},
})
