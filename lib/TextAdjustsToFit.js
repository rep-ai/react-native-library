// @flow
import React, { Component } from 'react'
import { Text } from 'react-native'

import { mergeStyles } from '../lib'

export type TextAdjustsToFitProps = {
        ellipsizeMode: void,
        numberOfLines: void,
        allowFontScaling: true,
        adjustsFontSizeToFit: true,
        minimumFontScale: number,

        suppressHighlighting?: false,
        selectable?: bool,
        style?: any,
        children?: any,
}

class TextAdjustsToFit extends Component {
    static defaultProps = {
        // Required props
        allowFontScaling: true,
        adjustsFontSizeToFit: true,

        minimumFontScale: 1,
        selectable: true,
        suppressHighlighting: false,
        // these get disabled by adjustsFontSizeToFit
        numberOfLines: undefined,
        ellipsizeMode: undefined,
    }

    props: TextAdjustsToFitProps
    style = mergeStyles(styles.text, this.props.style)

    componentWillReceiveProps({ style }: any) {
        if (style) {
            this.style = mergeStyles(styles.text, style)
        }
    }

    render() {
        const { children } = this.props

        return (
            <Text {...this.props} style={this.style}>{children}</Text>
        )
    }
}

import { styles } from './Text'

export default TextAdjustsToFit
