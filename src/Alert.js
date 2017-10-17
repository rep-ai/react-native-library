// @flow
import { Alert } from 'react-native'

const _Alert = (
    title: string,
    message: string,
    onPress: Function,
    text?: string = 'OK'
) => {
    Alert.alert(
        title,
        message,
        [{ text, onPress }],
        { cancelable: false }
    )

    return null
}

// EXAMPLE
// _Alert(
//     'No Title!',
//     'Please provide a title',
//     () => console.log('hello'),
//     "OK"
// )

export default _Alert
