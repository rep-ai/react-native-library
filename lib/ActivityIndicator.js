// @flow
import React, { PureComponent } from 'react'
import { View, Platform, ActivityIndicator } from 'react-native'
import styles from '../lib/styles'
import colors from '../lib/colors'
import * as Progress from 'react-native-progress'

export default class ActivityIndicatorComponent extends PureComponent {
    static defaultProps = {
        color: colors.main,
        style: {},
        size: 'large',
        fill: true,
        useNative: false
    }

    props: {
        style: any,
        color: string,
        size: mixed,
        fill: bool,
        useNative: bool,
    }

    render() {
        const { style, color, size, fill, useNative } = this.props
        const sizeValue = (size === 'large' || size === 1) ? 36 : 24

        const viewStyles = []
        fill && viewStyles.push(styles.container)
        viewStyles.concat(style)

        return (
            <View style={viewStyles}>
                {(Platform.OS === 'ios' && !useNative) ? (
                    <Progress.CircleSnail
                        size={sizeValue}
                        color={color}
                        indeterminate
                        spinDuration={2000}
                    />
                ) : (
                    <ActivityIndicator
                        size={size}
                        color={color}
                    />
                )}
            </View>
        )
    }
}
