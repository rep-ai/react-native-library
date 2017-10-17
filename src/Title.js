// @flow
import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import colors from './colors'

import capitalize from './UtilityMethods/capitalize'

class Title extends Component {
    static defaultProps = {
        // custom
        upperCase: false,

        selectable: false,
        allowFontScaling: true,
        suppressHighlighting: true,
        minimumFontScale: 1,
        numberOfLines: 1,
        ellipsizeMode: 'tail',

        // Stops ellipsizeMode from working if true.
        adjustsFontSizeToFit: false,
    }

    props: {
        upperCase?: bool,
        capitalize?: bool,
        ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip',
        numberOfLines?: number,
        minimumFontScale?: number,
        allowFontScaling: bool,
        adjustsFontSizeToFit: false,
        suppressHighlighting: bool,
        selectable: bool,
        style?: any,
        children?: any,
    }

    text = String(
        (typeof this.props.children !== 'string')
        ? this.props.children
        : (this.props.capitalize === true)
        ? capitalize(this.props.children)
        : (this.props.upperCase === true)
        ? this.props.children.toUpperCase()
        : this.props.children
    )

    render() {
        return (
            <Text {...this.props}
                style={[styles.title].concat( this.props.style)}>{this.text}</Text>
        )
    }
}

export const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: colors.grey,
        marginVertical: 12,
        marginHorizontal: 21,
        backgroundColor: 'transparent',
    },
})

export default Title
