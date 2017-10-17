// @flow
import React, { Component, PureComponent } from 'react'
import {
	StyleSheet,
	View,
    Animated,
    Dimensions,
    PanResponder,
    Text,
    TouchableOpacity,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import colors from './colors'

class PlayButton extends PureComponent {
    props: {
        setPaused: (paused: bool) => void,
        getPausedState: () => bool,
    }

    state: {
        name: 'ios-play' | 'ios-pause'
    } = { name: !this.props.getPausedState() ? 'ios-pause' : 'ios-play' }

    handlePress = () => {
        this.setState(({ name }) => ({
            name: name === 'ios-play' ? 'ios-pause' : 'ios-play'
        }), () => {
            this.props.setPaused(!this.props.getPausedState())
        })
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.handlePress}
                style={styles.iconView}>
                <Icon
                    name={this.state.name}
                    size={28}
                    color="white"
                    style={{backgroundColor: 'transparent'}}
                />
            </TouchableOpacity>
        )
    }
}
// TODO: Make when the two markers are
// touching the value difference is only 1 frame
export default class VideoSlider extends Component {
    static defaultProps = {
        visible: true,
        duration: 5,
        fps: 240,
        markerSize: 28,
        margin: 28,
        width: Dimensions.get('window').width,
        onValueChange: (left, right, selectedMarker) => {},
        style: {},
        playButton: 'ios-play'
    }

    props: {
        visible: bool,
        duration: number,
        fps: number,
        markerSize: number,
        margin: number,
        width: number,
        onValueChange: (
            left: number,
            right: number,
            selectedMarker: 'left' | 'right' | 'none'
        ) => any,
        playButton: 'ios-play' | 'ios-pause',
        setPaused: (paused: bool) => void,
        playPause: () => any,
        style: any,
    }

    componentIsMounted: bool
    componentIsMounted = false

    componentWillMount() {
        this.componentIsMounted = true
    }

    componentWillUnmount() {
        this.componentIsMounted = false
    }

    setStateIfMounted = (...args: any[]) => {
        if (this.componentIsMounted) {
            this.setState(...args)
        }
    }

    hiddenTranslateY: number
    hiddenTranslateY = 200

    hide = () => {
        if (!this.props.visible && this.state.isVisible) {
            Animated.timing(this.state.translateY, {
                toValue: this.hiddenTranslateY,
                duration: 200,
                useNativeDriver: true
            }).start(() => {
                this.setStateIfMounted({ isVisible: false })
            })
        }
    }

    show = () => {
        if (this.props.visible && !this.state.isVisible) {
            this.setState({ isVisible: true }, () => {
                Animated.timing(this.state.translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }).start()
            })
        }
    }

    componentDidMount() {
        this.show()
    }

    componentWillReceiveProps({ visible, playButton, duration, fps }: { visible: bool }) {
        if (typeof visible !== 'undefined') {
            (visible ? this.show : this.hide)()
        }
        if (this.frameCount && this.step) {
            this.frameCount = Math.ceil(duration * fps)
            this.step = (this.width / this.frameCount)
        }
    }

    handleValueChange = () => {
        this.props.onValueChange(
            this.getCurrentFrameBySide('left'),
            this.getCurrentFrameBySide('right'),
            this.selectedMarker
        )
    }

    margin: number
    margin = this.props.margin

    width: number
    width = ( this.props.width - (this.margin * 2) )

    markerSize: number
    markerSize = this.props.markerSize

    originalRight: number
    originalRight = (
        this.props.width - (this.margin * 2) - (this.markerSize / 2)
    )

    markerPositions: { left: number, right: number }
    markerPositions = {
        left: this.markerSize / 2,
        right: this.originalRight
    }

    state: {
        visible: bool,
        markerPositionLeft: any,
        markerPositionRight: any,
        highlight: any,
        opacity: any,
        valueLeft: number,
        valueRight: number,
        translateY: any,
        isVisible: bool
    }

    state = {
        translateY: new Animated.Value(this.hiddenTranslateY),
        highlight: new Animated.Value(0),
        opacity: new Animated.Value(0),
        markerPositionLeft: new Animated.Value(this.markerPositions.left),
        markerPositionRight: new Animated.Value(this.markerPositions.right),
        valueLeft: this.markerPositions.left,
        valueRight: this.markerPositions.right,
        isVisible: false
    }

    markerStyle: {
        width: number,
        height: number,
        borderRadius: number,
    }

    markerStyle = {
        width: this.markerSize,
        height: this.markerSize,
        borderRadius: this.markerSize / 2,
    }

    shouldSetValue = (x: number, type: 'left' | 'right'): bool => (
        (x - (this.markerSize / 2)) < this.markerPositions[type]
        && (x + (this.markerSize / 2)) > this.markerPositions[type]
    )

    selectedMarker: 'left' | 'right' | 'none'
    selectedMarker = 'none'

    getAnimatedProps = (toValue: number) => ({
        toValue,
        duration: 0,
        useNativeDriver: true,
    })

    highlightWidth: number
    highlightWidth = 66

    prevLeft: number
    prevLeft = 0

    prevRight: number
    prevRight = 0

    setValueByType = (type: 'left' | 'right', value: number) => {
        const oppositeType = type === 'left' ? 'right' : 'left'

        const animations = [
            Animated.timing(
                this.state.highlight,
                this.getAnimatedProps(value - (this.highlightWidth / 2))
            )
        ]

        // This workaround might not be needed.
        animations.push(
            Animated.timing(
                this.state.opacity,
                this.getAnimatedProps(1)
            )
        )

        if (type === 'left') {
            // Keeps marker in for overlapping other marker
            if (value + this.markerSize > this.markerPositions[oppositeType]) {
                return null
            }

            // Keeps marker in bounds of container
            this.markerPositions[type] = value
            if (this.markerPositions[type] < (this.markerSize / 2)) {
                this.markerPositions[type] = (this.markerSize / 2)
                return null
            }

            animations.push(
                Animated.timing(
                    this.state.markerPositionLeft,
                    this.getAnimatedProps(this.markerPositions[type])
                )
            )

            // what are these values for?
            this.prevLeft = value
            this.setState({
                valueLeft: value,
            })
        }

        if (type === 'right') {
            if (value < this.markerPositions[oppositeType] + this.markerSize) {
                return null
            }

            this.markerPositions[type] = value
            if (this.markerPositions[type] > this.width - (this.markerSize / 2)) {
                this.markerPositions[type] = this.width - (this.markerSize / 2)
                return null
            }

            animations.push(
                Animated.timing(
                    this.state.markerPositionRight,
                    this.getAnimatedProps(this.markerPositions[type])
                )
            )

            this.prevRight = value
            this.setState({
                valueRight: value,
            })
        }

        Animated.parallel(animations).start()

        this.handleValueChange()

        return null
    }

    setValue = (values: {left?: number, right?: number}) => {
        if (typeof values.left === 'number')  {
            return this.setValueByType('left', Number(values.left))
        }

        if (typeof values.right === 'number') {
            return this.setValueByType('right', Number(values.right))
        }
    }

    handlePanResponderGrant = (
        {nativeEvent: { locationX: x }}:
        {nativeEvent: { locationX: number }}
    ) => {
        const left: bool = this.shouldSetValue(x, 'left')
        const right: bool = this.shouldSetValue(x, 'right')

        if (left) {
            this.selectedMarker = 'left'
            this.setValue({left: x})
        } else if (right) {
            this.selectedMarker = 'right'
            this.setValue({right: x})
        } else if (!left && !right) {
            this.selectedMarker = 'none'
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true,
            }).start()
        }

        this.handleValueChange()
    }

    handlePanResponderMove = (e: any, gs: any) => {
        if (this.selectedMarker === 'left') {
            return this.setValue({left: gs.moveX})
        }

        if (this.selectedMarker === 'right') {
            return this.setValue({right: gs.moveX})
        }
    }

    handlePanResponderRelease = (e: any, g: any) => {
        if (!g.numberActiveTouches) {
            this.selectedMarker === 'none'
            this.handleValueChange()
        }
    }

    panResponder = PanResponder.create({
    	onStartShouldSetPanResponder: () => this.props.visible,
    	onStartShouldSetPanResponderCapture: () => this.props.visible,
    	onMoveShouldSetPanResponder: () => this.props.visible,
    	onMoveShouldSetPanResponderCapture: () => this.props.visible,
    	onPanResponderGrant: this.handlePanResponderGrant,
    	onPanResponderMove: this.handlePanResponderMove,
    	onPanResponderTerminationRequest: () => !this.props.visible,
    	onPanResponderRelease: this.handlePanResponderRelease,
    	onPanResponderTerminate: () => {},
    	onShouldBlockNativeResponder: () => this.props.visible,
    })

    frameCount: number
    frameCount = Math.ceil(this.props.duration * this.props.fps)

    step: number
    step = (this.width / this.frameCount)

    stepBack = () => {
        if (this.selectedMarker === 'left') {
            return this.setValue({left: this.prevLeft - this.step})
        }

        if (this.selectedMarker === 'right') {
            return this.setValue({right: this.prevRight - this.step})
        }
    }

    stepForward = () => {
        if (this.selectedMarker === 'left') {
            return this.setValue({left: this.prevLeft + this.step})
        }

        if (this.selectedMarker === 'right') {
            return this.setValue({right: this.prevRight + this.step})
        }
    }

    bufferFrames: number
    bufferFrames = 0

    getCurrentFrameBySide = (type: 'left' | 'right' | 'none'): number => {
        if (type === 'none') {
            return 0
        }

        const value = (type === 'left'
        ? this.state.valueLeft
        : this.state.valueRight)

        const result = Math.round(value / this.step)

        if (result < this.bufferFrames) {
            return 0
        }

        if (result > this.frameCount - this.bufferFrames) {
            return this.frameCount
        }
        return result
    }

    getCurrentFrame = (): number => this.getCurrentFrameBySide(
        this.selectedMarker
    )

    getCroppedFrameCount = (): number => (
        this.getCurrentFrameBySide('right')
        - this.getCurrentFrameBySide('left')
    )

    render() {
        if (!this.state.isVisible) {
            return null
        }

        return (
            <Animated.View style={[
                styles.flexCenter,
                { transform: [{ translateY: this.state.translateY }]}
            ].concat(this.props.style)}>
                <View>
                    <View style={[styles.container, {width: this.width}]}>
                        <View style={[
                            styles.sliderBackgroundContainer, {
                                width: this.width - (this.markerSize * 2)
                                + this.markerSize,
                                left: this.markerSize / 2
                            }
                        ]}>
                            <Animated.View style={[
                                styles.sliderCover, {
                                transform: [{
                                    translateX: this.state.markerPositionLeft
                                }],
                                left: '-100%',
                            }]}/>
                            <Animated.View style={[
                                styles.sliderCover, {
                                transform: [{
                                    translateX: this.state.markerPositionRight
                                }],
                                right: 0,
                            }]}/>
                        </View>
                        {this.selectedMarker !== 'none' && (
                            <Animated.View style={[
                                styles.label, {
                                transform: [{ translateX: this.state.highlight }],
                                width: this.highlightWidth,
                                opacity: this.state.opacity,
                            }]}>
                                <View style={styles.triangle}/>
                                <Text style={styles.text}>
                                    {this.getCurrentFrame()}
                                </Text>
                            </Animated.View>
                        )}
                        <Animated.View style={[styles.shadow, styles.marker, this.markerStyle, {
                            transform: [{translateX: this.state.markerPositionLeft}],
                            borderColor: this.selectedMarker === 'left'
                            ? colors.main : 'white',
                            marginLeft: -(this.markerSize / 2),
                        }]} />
                        <Animated.View style={[styles.shadow, styles.marker, this.markerStyle, {
                            transform: [{translateX: this.state.markerPositionRight}],
                            borderColor: this.selectedMarker === 'right'
                            ? colors.main : 'white',
                            marginLeft: -(this.markerSize / 2),
                        }]} />
                    </View>
                    <View {...this.panResponder.panHandlers} style={
                        [styles.container, {
                            width: this.width,
                            position: 'absolute',
                            backgroundColor: 'transparent' // required for certain nested touchables
                        }]
                    }/>
                </View>
                <View style={[styles.buttonsView, { width: this.width }]}>
                    <TouchableOpacity onPress={this.stepBack}>
                        <View style={styles.iconView}>
                            <Icon
                                name="ios-skip-backward"
                                color="white"
                                size={24}
                                style={{backgroundColor: 'transparent'}}
                            />
                        </View>
                    </TouchableOpacity>
                    <PlayButton
                        setPaused={this.props.setPaused}
                        getPausedState={this.props.getPausedState}
                    />
                    <TouchableOpacity onPress={this.stepForward}>
                        <View style={styles.iconView}>
                            <Icon
                                name="ios-skip-forward"
                                color="white"
                                size={24}
                                style={{backgroundColor: 'transparent'}}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        height: 180,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    flexCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    buttonsView: {
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'space-between',
    },

    iconView: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },

    triangle: {
        position: 'absolute',
        bottom: -3,
        backgroundColor: 'white',
        width: 35,
        height: 35,
        transform: [{rotate: '45deg'}]
    },

    container: {
        height: 50,
        justifyContent: 'center',
    },

    text: {
        color: colors.main,
        fontSize: 21,
    },

    label: {
        backgroundColor: 'white',
        position: 'absolute',
        height: 45,
        top: -60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },

    sliderCover: {
        backgroundColor: 'white',
        width: '100%',
        height: 6,
        position: 'absolute',
    },

    sliderBackgroundContainer: {
        backgroundColor: colors.main,
        width: '100%',
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',
    },

    shadow: {
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowRadius: 12,
        shadowOffset: {
            height: 0,
            width: 0
        },
    },

    marker: {
        backgroundColor: 'white',
        position: 'absolute',
        borderWidth: 1,
        elevation: 1,
    }
})
