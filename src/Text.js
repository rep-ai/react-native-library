// @flow
import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import colors  from './colors'

import mergeStyles from './UtilityMethods/mergeStyles'
import LoadingText from './LoadingText'

export type TextProps = {
    ellipsizeMode: 'head' | 'middle' | 'tail' | 'clip',
    numberOfLines: number,
    allowFontScaling: false,
    adjustsFontSizeToFit: false,

    minimumFontScale?: number,
    suppressHighlighting?: false,
    selectable?: bool,
    style?: any,
    children?: any,

    loading?: bool,
    loadingWidth?: number,
    loadingHeight?: number,
}

class TextComponent extends Component {
    static defaultProps = {
        selectable: true,
        suppressHighlighting: false,
        numberOfLines: 1,
        ellipsizeMode: 'tail',
        // unsure if this effects non-scaled text.
        minimumFontScale: 1,
        // Stops ellipsizeMode from working if true.
        allowFontScaling: false,
        adjustsFontSizeToFit: false,
    }

    props: TextProps
    style = mergeStyles(styles.text, this.props.style)

    componentWillReceiveProps({ style }: any) {
        if (style) {
            this.style = mergeStyles(styles.text, style)
        }
    }

    render() {
        const { loading, loadingWidth, loadingHeight, children } = this.props

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
        letterSpacing: 0,
        color: colors.text,
        backgroundColor: 'transparent',
    },
})

export default TextComponent
