// @flow
import React, { Component } from 'react'
import {
	Animated,
	View,
	TextInput,
    Easing,
    Dimensions,
    StyleSheet,
    Platform,
} from 'react-native'

// import Icon from 'react-native-vector-icons/MaterialIcons'
import { dynamicDuration } from './util'

class TextInputComponent extends Component {
    static defaultProps = {
        width: Dimensions.get('window').width - 64,
        // hack to show textInput properly on Android 
        height: Platform.OS === 'android' ? 40 : 34,
        backgroundColor: 'transparent',
        placeholderTextColor: 'rgba(255,255,255,0.8)',
        color: '#6D6D6D',
        focusColor: '#2B78FB',
        errorColor: '#ED4741',
        returnKeyType: 'done',
    }

    props: {
        color: string,
        focusColor: string,

        errorColor: string,
        errorMessage?: string,

        label: string,
        labelColor?: string,
        textColor?: string,
        underlineColor?: string,
        underlineHighlightColor?: string,
        backgroundColor: string,
        getRef?: (ref: any) => any,

        // same as TextInput
        width: number,
        height: number,
        style?: any,
        placeholder?: string,
        placeholderTextColor?: string,
        onChangeText?: Function,
        onSubmitEditing?: Function,
        onFocus?: Function,
        onBlur?: Function,
		showRequiredError?: bool,
        blurOnSubmit?: bool,
        spellCheck?: bool,
        autoCorrect?: bool,
        autoFocus?: bool,
		selectionColor?: string,
		secureTextEntry?: bool,
        keyboardAppearance?: string,
        autoCapitalize?: string,
        returnKeyType?: string,
        keyboardType?: string,
        defaultValue?: mixed,
    }

    textState: 'empty' | 'filled'
    textState = 'empty'

    colorState: 'focus' | 'blur' | 'error'
    colorState = 'blur'

    focus = {
        scale: 1,
        translateX: 0,
        translateY: 0,
        opacity: 1,
        underlineX: 0
    }

    blur = {
        scale: 1 + (1 / 3),
        translateX: this.props.width / 8,
        // hack to show textInput properly on Android 
        translateY: Platform.OS === 'android' ? 0 : 18,
        opacity: 0,
        underlineX: -this.props.width,
    }

    init = this.props.autoFocus ? this.focus : this.blur

	showRequiredError = this.props.showRequiredError
    selectionColor = this.props.selectionColor || this.props.focusColor

    state = {
        opacity: new Animated.Value(this.init.opacity),
        scale: new Animated.Value(this.init.scale),
        translateX: new Animated.Value(this.init.translateX),
        translateY: new Animated.Value(this.init.translateY),
        underlineX: new Animated.Value(this.init.underlineX),
        requiredErrorTranslateX: new Animated.Value(0),
        errorOpacity: new Animated.Value(0),
        selectionColor: this.selectionColor,
    }

    easing = Easing.bezier(0.4, 0, 0.2, 1)

    animate = (type:  'focus' | 'blur') => {
        const duration = dynamicDuration(this.blur.translateY)
        const easing = this.easing
        const useNativeDriver = true

        const thisType = type === 'focus' ? this.focus : this.blur

        const animationArray = [
            Animated.timing(this.state.underlineX, {
                toValue: thisType.underlineX,
                duration: dynamicDuration(this.props.width),
                easing,
                useNativeDriver,
            })
        ]

        if (type === 'blur' && this.text) {
        } else {
            animationArray.push(
                Animated.timing(this.state.opacity, {
                    toValue: thisType.opacity,
                    duration, easing, useNativeDriver
                })
            )

            animationArray.push(
                Animated.timing(this.state.scale, {
                    toValue: thisType.scale,
                    duration, easing, useNativeDriver
                })
            )

            animationArray.push(
                Animated.timing(this.state.translateX, {
                    toValue: thisType.translateX,
                    duration, easing, useNativeDriver
                })
            )

            animationArray.push(
                Animated.timing(this.state.translateY, {
                    toValue: thisType.translateY,
                    duration, easing, useNativeDriver
                })
            )
        }

        return Animated.parallel(
            animationArray, { stopTogether: false }
        ).start()
    }

    handleFocus = () => {
        this.animate('focus')

        this.props.onFocus
        && this.props.onFocus()
    }

    handleBlur = () => {
        this.animate('blur')

        this.props.onBlur
        && this.props.onBlur()
    }

	handleShowRequiredError = () => {
        const duration = dynamicDuration(8)
        const easing = this.easing

        Animated.timing(this.state.errorOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start()

        this.setState({
            selectionColor: this.props.errorColor
        }, () => {
    		Animated.sequence([
    			Animated.timing(this.state.requiredErrorTranslateX, {
    				toValue: 8,
                    duration, easing, useNativeDriver: true
    			}),
    			Animated.timing(this.state.requiredErrorTranslateX, {
    				toValue: 0,
    				duration: duration * 2,
                    easing: Easing.elastic(2),
                    useNativeDriver: true
    			})
    		])
            .start()
        })
	}

	componentWillReceiveProps({ showRequiredError }: { showRequiredError?: bool }) {
        if (typeof showRequiredError === 'boolean') {
    		if (showRequiredError && !this.showRequiredError) {
    			this.showRequiredError = true
    			this.handleShowRequiredError()
    		}

    		if (!showRequiredError && this.showRequiredError) {
    			this.showRequiredError = false
                Animated.timing(this.state.errorOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
                }).start()
                this.setState({ selectionColor: this.selectionColor })
    		}
        }
	}

    textInputRef: any
    text: string

    render() {
        const {
            width,
            height,
            autoFocus,
            label,
            backgroundColor,
            focusColor,
            spellCheck,
            autoCorrect,
            keyboardAppearance,
            autoCapitalize,
            returnKeyType,
            keyboardType,
			secureTextEntry,
			getRef,
			onChangeText,
            errorMessage,
            errorColor,
            showRequiredError,
            color,
            style,
            defaultValue,
        } = this.props

        return (
            <View style={[{
                width,
                backgroundColor,
                paddingTop: 16,
                alignSelf: 'center',
            }].concat(style)}>
                <Animated.View style={{
                transform: [
                    {translateX: this.state.requiredErrorTranslateX},
                ], }}>
                    <Animated.Text
                        selectable={false}
                        suppressHighlighting={true}
                        style={[styles.label, {
                        opacity: 0.8,
                        color: showRequiredError ? errorColor : color,
                        transform: [
                            {scale: this.state.scale},
                            {translateX: this.state.translateX},
                            {translateY: this.state.translateY},
                        ],
                    }]}>{label}</Animated.Text>
                </Animated.View>

                <Animated.View style={{ opacity: this.state.opacity }}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        defaultValue={defaultValue}
                        autoFocus={autoFocus}
                        spellCheck={spellCheck}
                        autoCorrect={autoCorrect}
                        keyboardAppearance={keyboardAppearance}
                        autoCapitalize={autoCapitalize}
    					secureTextEntry={secureTextEntry}
                        returnKeyType={returnKeyType}
                        keyboardType={keyboardType}
                        selectionColor={this.state.selectionColor}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={this.props.placeholderTextColor}
                        style={[styles.textInput, {
    						height,
                            width,
    						color: showRequiredError ? errorColor : color,
                        }]}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        ref={r => {
                            this.textInputRef = r
                            getRef
                            && getRef(this.textInputRef)
                        }}
                        onChangeText={text => {
                            this.text = text
                            onChangeText
                            && onChangeText(this.text)
                        }}
                    />
                </Animated.View>

                <Animated.View style={[styles.underlineContainer, { width }]}>
                    <View
                        style={[styles.underline, {
                            opacity: 0.7,
                            backgroundColor: showRequiredError ? errorColor : color,
                        }]}
                    />
                    <Animated.View
                        style={[styles.underline, styles.underlineHighlight, {
                            backgroundColor: showRequiredError ? errorColor : focusColor,
                            transform: [{ translateX: this.state.underlineX }],
                        }]}
                    />
                </Animated.View>

                <Animated.Text
                    selectable={false}
                    suppressHighlighting={true}
                    style={[styles.label, {
                    marginTop: 8,
                    opacity: this.state.errorOpacity,
                    color: errorColor,
                }]}>{errorMessage || 'Error'}</Animated.Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: 16,
        backgroundColor: 'transparent',
    },

    underlineContainer: {
		overflow: 'hidden',
        height: StyleSheet.hairlineWidth * 2,
    },

    underline: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: StyleSheet.hairlineWidth,
    },

    underlineHighlight: {
        height: StyleSheet.hairlineWidth * 2,
    },

    label: {
        fontSize: 12,
		backgroundColor: 'transparent',
    },
})

export default TextInputComponent
