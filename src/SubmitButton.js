// @flow
import React, { Component } from 'react'

import {
    Text,
    TouchableOpacity,
    StyleSheet,
	Animated,
	ActivityIndicator,
    Dimensions,
} from 'react-native'

import PT from 'prop-types'

import colors from './colors'

export default class SubmitButton extends Component {
    static propTypes = {
        submitting: PT.bool,
        title: PT.string.isRequired,
        onPress: PT.func.isRequired,
        onTimeout: PT.func.isRequired,
        width: PT.number,
        height: PT.number,
        fontSize: PT.number,
        color: PT.string,
        backgroundColor: PT.string,
        borderColor: PT.string,
        marginTop: PT.number
    }

    static defaultProps = {
        width: Math.min(280, Dimensions.get('window').width / (414 / 300)),
        height: Math.min(44, Dimensions.get('window').height / (736 / 54)),
        fontSize: Math.min(16, Dimensions.get('window').height / (736 / 21)),
        color: colors.main,
        backgroundColor: 'white',
        borderColor: colors.main,
        borderWidth: StyleSheet.hairlineWidth,
        marginTop: 0,
    }

    submitting = this.props.submitting

    state = {
        width: new Animated.Value(this.props.width),
        textOpacity: new Animated.Value(1),
        activityIndicatorOpacity: new Animated.Value(0),
        submitting: this.submitting,
    }

    animate = () => {
        Animated.parallel([
            Animated.timing(this.state.width, {
                toValue: this.submitting ? this.props.height : this.props.width,
                duration: this.submitting ? 100 : 200,
            }).start(),
            Animated.timing(this.state.textOpacity, {
                toValue: this.submitting ? 0 : 1,
                duration: this.submitting ? 100 : 300,
                delay: this.submitting ? 0 : 100,
            }).start(),
            Animated.timing(this.state.activityIndicatorOpacity, {
                toValue: this.submitting ? 1 : 0,
                duration: this.submitting ? 300 : 100,
                delay: this.submitting ? 100 : 0,
            }).start()
        ], { stopTogether: false })
    }

    componentWillUnmount() {
        this.submitting = false
        this.setState({ submitting: false })
        this.state.width.stopAnimation()
        this.state.textOpacity.stopAnimation()
        this.state.activityIndicatorOpacity.stopAnimation()
        clearTimeout(this.timeout)
    }

    handleTimeout = () => {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            clearTimeout(this.timeout)
            this.submitting = false
            this.setState({
                submitting: false,
            }, () => {
                this.animate()
                this.props.onTimeout()
            })
        }, 10000)
    }

    componentWillReceiveProps({submitting}) {
        if (typeof submitting !== 'undefined'
            && this.submitting !== submitting) {
            this.submitting = submitting

            this.setState({
                submitting,
            }, () => {
                this.animate()
                if (submitting) {
                    this.handleTimeout()
                }
            })
        }
    }

    render() {
        const {
            title,
            fontSize,
            color,
            height,
            backgroundColor,
            borderColor,
            borderWidth,
            onPress,
            marginTop,
        } = this.props

        return (
            <Animated.View style={[styles.button, {
                borderWidth,
                borderColor,
                backgroundColor,
                height,
                width: this.state.width,
                borderRadius: height / 2,
                marginTop,
            }]}>
                <TouchableOpacity
                    style={styles.container}
                    onPress={onPress}>
                    <Animated.View style={[styles.container, {
                        height,
                        opacity: this.state.textOpacity,
                    }]}>
                        <Text style={[styles.buttonText,
                            {fontSize, color}]}>
                            {title}
                        </Text>
                    </Animated.View>
                    <Animated.View style={[styles.container, {
                        height,
                        opacity: this.state.activityIndicatorOpacity,
                    }]}>
                        <ActivityIndicator
                            size="small"
                            color={color}
                            style={{
                                transform: [{ scale: height  / (54 / 1.2) }]
                            }}
                        />
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    flex: {flex: 1},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},

    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },

	buttonText: {
		textAlign: 'center',
	},
})
