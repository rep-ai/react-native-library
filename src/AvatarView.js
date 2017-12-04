// @flow
import React, { PureComponent } from 'react'
import { Image, View, ActivityIndicator } from 'react-native'

import colors from './colors'
import styles from './styles'

import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

export type Props = {|
    avatar?: { uri?: string },
    style?: StyleObj,
    size?: number,
    overlayColor?: string,
|}

export type State = {|
    loading: bool,
    imageVisible: bool,
|}

export default class AvatarView extends PureComponent<Props, State> {
    static defaultProps = {
        avatar: {},
        style: {},
        size: 50,
        overlayColor: 'transparent'
    }

    state = {
        loading: false,
        imageVisible: false
    }

    handleLoadStart = () => {
        if (this.props.avatar && this.props.avatar.uri && !this.state.loading) {
            this.setState({ loading : true })
        }
    }

    handleLoadEnd = () => {
        this.setState({ loading : false })
    }

    handleError = (e: Error) => {
        console.warn('AvatarView Error: ', e, this.props.avatar)
    }

    render() {
        const {
            style,
            overlayColor
        } = this.props

        const circleStyle = {
            width: this.props.size,
            height: this.props.size,
            borderRadius: Number(this.props.size) / 2,
        }

        return (
            <View style={[
                circleStyle, {
                    backgroundColor: colors.middleGrey
                }
            ].concat(style)}>
                <Image
                    style={[
                        styles.absoluteFill,
                        circleStyle,
                        { overlayColor }
                    ]}
                    source={
                        (this.props.avatar && this.props.avatar.uri)
                            ? this.props.avatar
                            : require('./images/avatarPlaceholder.png')
                    }
                    defaultSource={require('./images/avatarPlaceholder.png')}
                    resizeMode="cover"
                    onLoadStart={this.handleLoadStart}
                    onLoadEnd={this.handleLoadEnd}
                    onError={this.handleError}
                />
                {!!this.state.loading && (
                    <ActivityIndicator
                        style={[styles.absoluteFill, circleStyle, {
                            backgroundColor: colors.middleGrey,
                        }]}
                        color="white"
                    />
                )}
            </View>
        )
    }
}
