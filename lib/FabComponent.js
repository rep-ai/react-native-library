// @flow
import React, { Component } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Animated,
    FlatList,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import colors from '../lib/colors'
import styles from '../lib/styles'

export default class FabComponent extends Component {
    state = {
        scale: new Animated.Value(this.props.initialScale || 1),
    }

    animateScale = toValue => (
        Animated
        .spring(
            this.state.scale,
            {toValue}
        )
        .start()
    )

    visible = this.props.visible

    show = () => {
        this.visible = true
        this.animateScale(1)
    }

    hide = () => {
        this.visible = false
        this.animateScale(0)
    }

    componentWillReceiveProps({scrollDirection}) {
        if (scrollDirection === 'up') {
            if (!this.visible) {
                this.show()
            }
        }

        if (scrollDirection === 'down') {
            if (this.visible) {
                this.hide()
            }
        }
    }

    render() {
        const {
            size = 56,
            margin = 24,
            onPress,
            iconProps,
        } = this.props

        return (
            <Animated.View style={[
                localStyles.fabContainer, {
                    bottom: margin,
                    right: margin,
                    height: size,
                    width: size,
                    transform: [{
                        scale: this.state.scale
                    }],
                    backgroundColor: 'white',
                    borderRadius: size / 2,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: 'rgba(0,0,0,0.1)',
                    shadowColor: 'black',
                	shadowOpacity: 0.24,
                	shadowRadius: 12,
                	shadowOffset: {
                		height: 12,
                		width: 0
                	},
                    elevation: 10,
                }]}>

                <TouchableOpacity
                    onPress={onPress}
                    style={[styles.container,
                        localStyles.touchableOpacity, {
                        height: size,
                        width: size,
                        borderRadius: size / 2,
                        backgroundColor: 'white',
                        shadowColor: 'black',
                    	shadowOpacity: 0.12,
                    	shadowRadius: 12,
                    	shadowOffset: {
                    		height: 0,
                    		width: 0
                    	},
                    }]}>
                        <Icon
                            size={(size / (56 / 24))}
                            color={colors.main}
                            name={'add'}
                            {...iconProps}
                        />
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

const localStyles = StyleSheet.create({
    touchableOpacity: {
    },

    fabContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

// Test code
export function getScrollDirection({nativeEvent: {contentOffset: {y}}}) {
    this.scrollValueStore = this.scrollValueStore || [0]

    this.scrollValueStore.push(y)

    if (this.scrollValueStore[0] < this.scrollValueStore[1]) {
        if (this.state.scrollDirection !== 'down') {
            this.setState({scrollDirection: 'down'})
        }
    } else {
        if (this.state.scrollDirection !== 'up') {
            this.setState({scrollDirection: 'up'})
        }
    }

    this.scrollValueStore.shift()
}

export class FabComponentHideOnScrollExample extends Component {
    state = {}

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    onScroll={getScrollDirection.bind(this)}
                    data={this.data}
                    keyExtractor={(_, key) => key}
                    renderItem={this.renderItem}
                />

                <FabComponent
                    scrollDirection={this.state.scrollDirection}
                />
            </View>
        )
    }

    renderItem = ({item: {color}}) => (
        <View style={{
            height: 100, backgroundColor: color || 'blue'
        }} />
    )

    data = [
        {id: 'sidofjaoijfsa', color: 'green'},
        {id: 'sidofjaoijfsa'},
        {id: 'sidofjaoijfsa', color: 'green'},
        {id: 'sidofjaoijfsa'},
        {id: 'sidofjaoijfsa', color: 'green'},
        {id: 'sidofjaoijfsa'},
        {id: 'sidofjaoijfsa', color: 'green'},
        {id: 'sidofjaoijfsa'},
        {id: 'sidofjaoijfsa', color: 'green'},
        {id: 'sidofjaoijfsa'},
        {id: 'sidofjaoijfsa', color: 'green'},
        {id: 'sidofjaoijfsa'},
        {id: 'sidofjaoijfsa', color: 'green'},
    ]

}
