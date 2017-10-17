// @flow
import {  StyleSheet } from 'react-native'

import { elevationToShadowProps } from '../../lib/util'

const elevation = 24
export default StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    innerContainer: {
        elevation,
        ...elevationToShadowProps(elevation),
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 48,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '70%',
        maxWidth: '80%',
    },

    headerImageContainer: {
        position: 'absolute',
        top: -(76 / 2),
        width: 76,
        height: 76,
        borderRadius: 76 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },

    headerImage: {
        width: 48,
        height: 48,
    },

    flexCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonRow: {
        margin: 8,
        flexDirection: 'row',
    },

    animatedBackground: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.75)',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    title: {
        fontSize: 26,
        textAlign: 'center',
        marginVertical: 12,
        color: '#5D5D5D',
    },
    flex: {
        flex: 1,
    },
    description: {
        fontSize: 17,
        textAlign: 'center',
        marginHorizontal: 12,
        marginBottom: 16,
        color: '#797979'
    },

    image: {
        width: 200,
        height: 55,
        marginTop: 8,
        marginBottom: 32,
    }
})
