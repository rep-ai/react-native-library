// @flow
import React, { Component } from 'react'

import {
	Keyboard,
	View,
	LayoutAnimation,
} from 'react-native'

import PT from 'prop-types'

export default class KeyboardSpacer extends Component {
	static propTypes = {
		offset: PT.number,
		backgroundColor: PT.string,
	}

	static defaultProps = {
		offset: 0,
		backgroundColor: 'transparent',
	}

	state = {
		keyboardHeight: 0,
	}

	componentWillMount() {
		this.registerEvents()
	}

	componentWillUnmount() {
		this.unRegisterEvents()
	}

	registerEvents = () => {
		this.keyboardWillShowSubscription = Keyboard.addListener(
			'keyboardWillShow', this.keyboardWillShow
		)

		this.keyboardWillHideSubscription = Keyboard.addListener(
			'keyboardWillHide', this.keyboardWillHide
		)
	}

	unRegisterEvents = () => {
		this.keyboardWillShowSubscription.remove()
		this.keyboardWillHideSubscription.remove()
	}

	configureLayoutAnimation = (callback) => {
		LayoutAnimation.configureNext({
			duration: 100,
			update: {
				type: 'keyboard',
			}
		})

        return callback && callback()
    }

    setKeyboardHeight = (keyboardHeight = 0) =>
		this.configureLayoutAnimation(() => {
            this.setState({ keyboardHeight })
        })

	keyboardWillShow = ({endCoordinates: { height }}) =>
        this.setKeyboardHeight(height - this.props.offset || 0)

	keyboardWillHide = () =>
        this.setKeyboardHeight(0)

	render() {
		const {
			backgroundColor
		} = this.props

		return (
            <View style={{
                backgroundColor,
                height: this.state.keyboardHeight,
            }} />
        )
	}
}
