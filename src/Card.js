import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import { elevationToShadowProps } from './util'

type Props = {
    width?: string,
    backgroundColor?: string,
    marginTop?: number,
    paddingTop?: number,
    paddingBottom?: number,
    elevation?: number,
    style?: any,
}

type State = {}

export default class Card extends PureComponent<Props, State> {
    static defaultProps = {
        width: '100%',
        backgroundColor: 'white',
        marginTop: 18,
        paddingTop: 16,
        paddingBottom: 9,
        elevation: 4
    }
    render() {
        const {
            width,
            backgroundColor,
            marginTop,
            paddingTop,
            paddingBottom,
            elevation,
            style
        } = this.props

        const styles = StyleSheet.create({
            container: {
                width,
                backgroundColor,
                marginTop,
                paddingTop,
                paddingBottom,
                elevation,
                ...elevationToShadowProps(elevation),
            }
        })
        return (
            <View style={[styles.container, style]}>
                {this.props.children}
            </View>
        )
    }
}