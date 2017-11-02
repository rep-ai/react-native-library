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
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 24,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '70%',
        maxWidth: '80%',
    },

    flex: {
        flex: 1,
    },

    title: {
        fontSize: 26,
        textAlign: 'center',
        marginVertical: 12,
        color: '#5D5D5D',
    },

    description: {
        fontSize: 17,
        textAlign: 'center',
        marginHorizontal: 12,
        marginBottom: 16,
        color: '#797979'
    },

    top: {
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