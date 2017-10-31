// @flow
import React, { Component } from 'react'

import {
    View,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native'

class ModalScreen extends Component {
    static defaultProps = {
        backgroundOpacity: 0.75,
        backgroundColor: 'black',
        touchingBackgroundShouldHide: false,
        speed: 13,
        bouncines: 4,
    }

    props: {
        visible: bool,
        children: any,
        touchingBackgroundShouldHide: bool,
        backgroundOpacity: number,
        backgroundColor: string,
        speed: number,
        bouncines: number,
        onHide?: () => any,
        onShow?: () => any,
        style?: any,
    }

    height: number
    height = Dimensions.get('window').height

    state = {
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(this.height),
        hidden: true,
    }

    state: {
        opacity: any,
        translateY: any,
        hidden: bool,
    }

    componentIsMounted: bool
    componentIsMounted = false

    componentWillMount() {
        this.componentIsMounted = true
        this.props.visible
        && this.show()
    }

    componentWillUnmount() {
        this.componentIsMounted = false
        this.props.onHide
        && this.props.onHide()
    }

    componentWillReceiveProps({ visible }: { visible: bool }) {
        typeof visible !== 'undefined'
        && (visible ? this.show : this.hide)()
    }

    show = () => {
        if (!this.componentIsMounted) {
            return
        }

        this.props.onShow
        && this.props.onShow()

        this.state.hidden
        && this.setState({ hidden: false }, () => {
            this.componentIsMounted
            && Animated.parallel([
                Animated.spring(this.state.translateY, {
                    toValue: 0,
                    speed: this.props.speed,
                    bouncines: this.props.bouncines,
                    useNativeDriver: true,
                }),
                Animated.timing(this.state.opacity, {
                    toValue: this.props.backgroundOpacity,
                    duration: 300,
                    useNativeDriver: true,
                })
            ], { stopTogether: false })
            .start()
        })
    }

    hide = () => {
        if (!this.componentIsMounted) {
            return
        }
        
        this.props.onHide
        && this.props.onHide()

        !this.state.hidden
        && Animated.parallel([
            Animated.timing(this.state.translateY, {
                toValue: this.height,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ], { stopTogether: false })
        .start((event) => {
            event
            && event.finished
            && this.componentIsMounted
            && this.setState({ hidden: true })
        })
    }

    render() {
        const {
            style,
            backgroundColor,
            touchingBackgroundShouldHide
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
                    {!!touchingBackgroundShouldHide && (
                        <TouchableWithoutFeedback onPress={this.hide}>
                            <View style={styles.positionAbsolute} />
                        </TouchableWithoutFeedback>
                    )}

                    {style ? (
                        <View style={style}>
                            {this.props.children}
                        </View>
                    ) : (
                        this.props.children
                    )}
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

export default ModalScreen
