// @flow
import React, { Component } from 'react'

import { View, Dimensions, ScrollView } from 'react-native'

import PT from 'prop-types'

import KeyboardSpacer from './KeyboardSpacer'

export default class HorizontalPagingScrollView extends Component {
	static propTypes = {
		width: PT.number,
		height: PT.number,
		getRef: PT.func,
		onLayout: PT.func,
	}

	static defaultProps = {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		style: {},
		contentContainerStyle: {},
	}

	state = {
		width: this.props.width,
		height: this.props.height,
	}

	handleLayout = (props) => {
		const {
			nativeEvent: {
				layout: { width, height }
			}
		} = props

		if (this.state.height !== height
			|| this.state.width !== width) {
			this.setState({ width, height })
		}

		this.props.onLayout
		&& this.props.onLayout(props)
	}

	handleScrollViewRef = r => {
		this.scrollViewRef = r
		this.props.getRef
		&& this.props.getRef(this.scrollViewRef)
	}

	handleCloneChildren = () =>
		React.Children.map(this.props.children, (child, index) => (
            <View key={index} style={{
                height: this.state.height,
                width: this.state.width,
			}}>
				{React.cloneElement(child)}
                <KeyboardSpacer
					backgroundColor={
						this.props.contentContainerStyle.backgroundColor
						|| this.props.style.backgroundColor
					}
				/>
			</View>
		))

	render() {
		return (
			<ScrollView
				directionalLockEnabled={true}
				showsHorizontalScrollIndicator={false}
				{...this.props}
				horizontal={true}
				pagingEnabled={true}
                onLayout={this.handleLayout}
                ref={this.handleScrollViewRef}>
				{this.handleCloneChildren()}
            </ScrollView>
		)
	}
}
