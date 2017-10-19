// @flow
import React, { PureComponent } from 'react'

import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import Text from '../Text'
import colors from '../colors'

import type { Style } from '../util/flowTypes'
import { mergeStyles } from '../util'

// https://material.io/guidelines/style/writing.html#writing-language
const defaultTitles = [ 'Sure', 'OK', 'Got it' ]

class Button extends PureComponent {
    static defaultProps = {
        title: defaultTitles[
            Math.round(Math.random() * (defaultTitles.length - 1))
        ],
        color: colors.main,
        activeColor: 'white',
        backgroundColor: 'white',
        activeBackgroundColor: colors.main,
        height: 55,
        borderWidth: 2,
        borderColor: colors.main,
        fontSize: 19,
        fontWeight: '500',
        invertColors: false,
    }

    props: {
        onPress: () => any,
        title: string,
        color: string,
        activeColor: string,
        backgroundColor: string,
        height: number,
        borderWidth: number,
        activeBackgroundColor: string,
        borderColor: string,
        fontSize: number,
        fontWeight: string,
        invertColors?: bool,
        style?: Style,
    }

    renderTitle = (isActiveType?: bool) => {
        const {
        	color,
        	activeColor,
        	title,
        	fontSize,
        	fontWeight,
        	borderWidth,
            invertColors
        } = this.props

        return (
            <Text
                selectable={false}
                suppressHighlighting={true}
                style={{
                    paddingHorizontal: (
                        fontSize
                        + borderWidth
                        - (!isActiveType ? borderWidth : 0)
                    ),
                    fontSize,
                    fontWeight,
                    color: (invertColors ? isActiveType : !isActiveType) ?
                        color : activeColor,
                    letterSpacing: 0.5
                }}>
                {title}
            </Text>
        )
    }

    colorStyles = (isActiveType?: bool) => {
        const {
            activeBackgroundColor,
        	backgroundColor,
            borderWidth,
            borderColor,
            invertColors,
            color,
        } = this.props

        if (invertColors ? !isActiveType : isActiveType) {
            return {
                backgroundColor: activeBackgroundColor
            }
        }

        return {
            backgroundColor: backgroundColor,
            borderWidth,
            borderColor: borderColor || color,
        }
    }

    render() {
        const {
        	onPress,
        	style,
            height,
        } = this.props

        const borderRadius = height / 2

        return (
            <View style={mergeStyles(
                styles.container, {
                    borderRadius,
                    height,
                    ...this.colorStyles(true),
                },
                style
            )}>
                {this.renderTitle(true)}
                <TouchableOpacity
                    style={[
                        styles.touchableOpacity, {
                            borderRadius,
                            height,
                            ...this.colorStyles(),
                        },
                    ]}
                    activeOpacity={0}
                    onPress={onPress}>
                    {this.renderTitle()}
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    touchableOpacity: {
        position: 'absolute',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 19,
        fontWeight: '500',
    },
})

export default Button
