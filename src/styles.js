// @flow
import { StyleSheet } from 'react-native'
import colors from './colors'

export const stylesObject = {
    flex: {
		flex: 1
	},

    center: {
		alignItems: 'center',
		justifyContent: 'center'
	},

    flexCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    flexCenterEnd: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    createButton: {
        borderWidth: 3,
        borderColor: 'white',
        backgroundColor: colors.main,
        height: 88,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    createButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 17,
        letterSpacing: 2,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    itemSeparatorComponent: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        height: StyleSheet.hairlineWidth,
    },

    colorGrey: {
        color: '#999',
    },

    absoluteFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    absoluteContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
    },

    ActivityIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
    },

    logoImage: {
        margin: 12,
        width: 949 / 5,
        height: 372 / 5,
    },

    flexStart: {
        flex: 1,
        justifyContent: 'flex-start'
    },

    flexStartRow: {
        alignItems: 'flex-start',
        flexDirection: 'row',
    },

    flexDirectionRow: {
        flexDirection: 'row'
    },

    facebookTouchableOpacity: {
        backgroundColor: '#415DAE',
        flexDirection: 'row',
        padding: 6,
        paddingLeft: 8,
        paddingRight: 15,
        paddingTop: 7,
        borderRadius: 3,
    },

    facebookText: {
        color: 'white',
    },

    facebookIcon: {
        marginRight: 4,
    },

    textInput: {
        paddingLeft: 12,
        height: 40,
        margin: 12,
        borderColor: 'gray',
        borderWidth: 1,
    },

    textStrong: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 2,
        letterSpacing: 0.5,
        color: colors.main,
    },

    textNumbers: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 19,
        color: '#666',
        letterSpacing: -0.8,
        textAlign: 'right',
    },

    textSmall: {
        fontSize: 11,
        fontWeight: 'bold',
        color: "#999",
        marginTop: 0,
        marginLeft: 2,
        marginRight: 6,
        textAlign: 'right',
    },

    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderRadius: 4,
        shadowColor: 'black',
        shadowOpacity: 0.075,
        shadowRadius: 12,
        shadowOffset: {
            height: -1,
            width: 0
        }
    },
}

const styleSheet = StyleSheet.create(stylesObject)
export default styleSheet
