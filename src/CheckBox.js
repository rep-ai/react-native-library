// @flow
import React, { PureComponent } from 'react'

import { 
    View,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import colors from '../colors'

type CheckBoxProps = {
    checked: bool,
    size: number,
    borderColor: string,
    borderRadius: number,
    backgroundColor: string,
    style: any,
}

class CheckBox extends PureComponent<CheckBoxProps> {
    static defaultProps = {
        checked: false,
        size: 44,
        borderColor: 'black',
        borderRadius: 22,
        backgroundColor: colors.lightMain,
        style: {}
    }
    
    render() {
        const {
            checked,
            size,
            borderColor,
            borderRadius,
            backgroundColor,
            style,
        } = this.props
        return (
            <View style={[{
                borderStyle: 'solid',
                borderWidth: 0.5,
                borderColor: checked ? 'transparent' : borderColor,
                borderRadius: borderRadius,
                opacity: checked ? 1 : 0.2,
                backgroundColor: checked ? backgroundColor : 'transparent',
                width: size,
                height: size,
            }, style]}>
                {!!checked &&
                    <Icon   name="done"
                            size={size}
                            color="#FFFFFF"
                    />
                }
            </View>
        )
    }
}

export default CheckBox