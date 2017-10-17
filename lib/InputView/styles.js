import { StyleSheet } from 'react-native'
import colors from '../../lib/colors'

export default StyleSheet.create({
    View: {
        marginTop: 12,
        height: 64,
        borderBottomColor: '#ccc',
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'white',
    },

    ViewRow: {
        marginTop: 12,
        height: 64,
        borderBottomColor: '#ccc',
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    Text: {
        color: '#333',
        fontSize: 11,
        letterSpacing: 1,
        paddingLeft: 12,
        paddingTop: 9,

    },

    TextInput: {
        flex: 1,
        padding: 12,
        paddingBottom: 5,
        color: colors.main
    }
})
