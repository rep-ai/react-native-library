// @flow
import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import colors from './colors'

import mergeStyles from './UtilityMethods/mergeStyles'
import LoadingText from './LoadingText'

export type TextProps = {
    ellipsizeMode: 'head' | 'middle' | 'tail' | 'clip',
    numberOfLines: number,
    allowFontScaling: bool,
    adjustsFontSizeToFit: bool,

    minimumFontScale?: number,
    suppressHighlighting?: bool,
    selectable?: bool,
    style?: StyleObj,
    children?: any,

    loading?: bool,
    loadingWidth?: number,
    loadingHeight?: number,
}

class TextComponent extends Component<TextProps> {
    static defaultProps = {
        selectable: true,
        suppressHighlighting: false,
        numberOfLines: 1,
        // NOTE: Unsure if this effects non-scaled text.
        minimumFontScale: 1,
        // NOTE: Stops ellipsizeMode from working if true.
        allowFontScaling: false,
        adjustsFontSizeToFit: false,
    }

    style = mergeStyles(styles.text, this.props.style)

    componentWillReceiveProps({ style }: TextProps) {
        if (style) {
            this.style = mergeStyles(styles.text, style)
        }
    }

    render() {
        const {
            loading,
            loadingWidth,
            loadingHeight,
            children,
        } = this.props

        if (loading) {
            return (
                <LoadingText
                    loading={loading}
                    width={loadingWidth}
                    height={loadingHeight}
                />
            )
        }

        return (
            <Text {...this.props} style={this.style}>{children}</Text>
        )
    }
}

export const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        color: colors.text,
        backgroundColor: 'transparent',
    },
})

export default TextComponent
