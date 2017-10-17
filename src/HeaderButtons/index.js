// @flow
import React, { Component } from 'react'
import { TouchableOpacity, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import mergeStyles from '../UtilityMethods/mergeStyles'
import styles from './styles'

export const _HeaderButtonTouchable = props => (
    <TouchableOpacity {...props}
        style={mergeStyles(styles.touchableOpacity, props.style)}>
        {props.children}
    </TouchableOpacity>
)

// NOTE: Tempo
const size = Platform.OS === 'android' ? 56 : 44
const statusBarHeight = (Platform.OS === 'android' ? 24 : 20)
const paddingRight = (statusBarHeight / 2) + 4
const iconPlatform = Platform.OS === 'android' ? 'md' : 'ios'

export const _HeaderButtonOptions = ({onPress}) => (
    <TouchableOpacity
        style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: size, height: size, paddingRight }}
        onPress={onPress}>
        <Icon
            name={`${iconPlatform}-more`}
            size={(Platform.OS === 'android' ? 24 : 32)}
            color={'white'}
        />
    </TouchableOpacity>
)

export class _BackButton extends Component {
    props: { iconStyle: any, iconProps: any }

    render() {
        const { iconStyle, iconProps } = this.props

        return (
            <_HeaderButtonTouchable style={{padding: 15}} {...this.props}>
                <Icon
                    name={'ios-close'}
                    size={44}
                    color={'white'}
                    {...iconProps}
                    style={iconStyle}
                />
            </_HeaderButtonTouchable>
        )
    }
}

export class _CheckButton extends Component {
    props: { iconStyle: any, iconProps: any }

    render() {
        const { iconStyle, iconProps } = this.props

        return (
            <_HeaderButtonTouchable style={{padding: 15}} {...this.props}>
                <Icon
                    name={'ios-checkmark'}
                    size={50}
                    color={'white'}
                    {...iconProps}
                    style={iconStyle}
                />
            </_HeaderButtonTouchable>
        )
    }
}