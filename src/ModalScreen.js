// @flow
import React, { PureComponent } from 'react'

import {
    View,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native'

export type Props = {|
    visible: bool,
    touchingBackgroundShouldHide: bool,
    backgroundOpacity: number,
    backgroundColor: string,
    speed: number,
    bouncines: number,
    onRequestClose?: () => any,
    onHide?: () => any,
    onShow?: () => any,
    children: any,
    style?: any,
|}

export type State = {|
    opacity: any,
    translateY: any,
    hidden: bool,
|}

export default class ModalScreen extends PureComponent<Props, State> {
    static defaultProps = {
        backgroundOpacity: 0.75,
        backgroundColor: 'black',
        touchingBackgroundShouldHide: false,
        speed: 13,
        bouncines: 4,
    }

    state = {
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(Dimensions.get('window').height),
        hidden: true,
    }

    componentIsMounted: bool = false

    componentWillMount() {
        this.componentIsMounted = true
        this.props.visible && this.show()
    }

    componentWillUnmount() {
        this.componentIsMounted = false
        this.props.onRequestClose && this.props.onRequestClose()
        this.props.onHide && this.props.onHide()
    }

    componentWillReceiveProps({ visible }: { visible: bool }) {
        if (typeof visible !== 'undefined') {
            if (visible) {
                this.show()
            } else {
                this.hide()
            }
        }
    }

    handleShowAnimation = () => {
        const {
            backgroundOpacity,
            speed,
            bouncines,
        } = this.props

        this.componentIsMounted && Animated.parallel([
            Animated.spring(this.state.translateY, {
                toValue: 0,
                speed: speed,
                bouncines: bouncines,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.opacity, {
                toValue: backgroundOpacity,
                duration: 300,
                useNativeDriver: true,
            })
        ], { stopTogether: false })
        .start()
    }

    show = () => {
        const { onShow } = this.props

        if (!this.componentIsMounted) {
            return
        }

        onShow && onShow()

        this.state.hidden
        && this.setState({ hidden: false }, this.handleShowAnimation)
    }

    handleHideAnimation = () => {
        Animated.parallel([
            Animated.timing(this.state.translateY, {
                toValue: Dimensions.get('window').height,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ], { stopTogether: false })
        .start((event: { finished: bool }) => {
            event
            && event.finished
            && this.componentIsMounted
            && this.setState({ hidden: true })
        })
    }

    hide = () => {
        const { onHide } = this.props

        if (!this.componentIsMounted) {
            return
        }

        onHide && onHide()

        // NOTE: this calls setState after the animation is complete.
        !this.state.hidden
        && this.handleHideAnimation()
    }

    render() {
        const {
            style,
            backgroundColor,
            touchingBackgroundShouldHide,
        } = this.props

        if (this.state.hidden) {
            return null
        }

        return (
            <View style={styles.positionAbsolute}>
                <Animated.View
                    style={[styles.positionAbsolute, {
                        opacity: this.state.opacity,
                        backgroundColor: backgroundColor,
                    }]}
                />

                <Animated.View style={[styles.positionAbsolute, {
                    transform: [{ translateY: this.state.translateY }]
                }]}>
                    <View style={[{ flex: 1 }].concat(style)}>
                        {!!touchingBackgroundShouldHide && (
                            <TouchableWithoutFeedback onPress={this.hide}>
                                <View style={styles.positionAbsolute} />
                            </TouchableWithoutFeedback>
                        )}

                        {this.props.children}
                    </View>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    positionAbsolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})
