// @flow
/*
    # TouchableResponder

    A wrapper for making views respond properly to touches
    and drags using the pan responder. Similar to TouchableHWithoutFeedback.

    Selected visuals are controlled by the wrapping parent.
    Which has access to all values.
*/

import React, { Component } from 'react'
import { PanResponder, View, Dimensions } from 'react-native'
import {
    ViewRef,
    LayoutEvent,
    ResponderHandler,
    ResponderShould,
} from './touchableTypes'

class TouchableResponder extends Component {
    static defaultProps = {
        x: 0,
        y: 0,
        width: 150,
        height: 150,
        xBoundingArea: 0,
        yBoundingArea: 0,
        widthBoundingArea: Dimensions.get('window').width,
        heightBoundingArea: Dimensions.get('window').height,
        enableScalling: false,
        enableMovement: false,
        debugMode: true,
    }

    props: {
        x: number,
        y: number,
        width: number,
        height: number,

        xBoundingArea: number,
        yBoundingArea: number,
        widthBoundingArea: number,
        heightBoundingArea: number,

        children: any,

        getRef?: (ref: ViewRef) => void,
        onLayout?: (event: LayoutEvent) => void,
        onPress: ResponderHandler,
        onMove: ResponderHandler,
        onRelease: ResponderHandler,

        debugMode: bool,
    }

    onStartShouldSetPanResponder: ResponderShould = (e, g) => true
    onStartShouldSetPanResponderCapture: ResponderShould = (e, g) => true
    onMoveShouldSetPanResponder: ResponderShould = (e, g) => true
    onMoveShouldSetPanResponderCapture: ResponderShould = (e, g) => true

    onPanResponderGrant: ResponderHandler = (e, g) => {
        const { onPress } = this.props
        onPress && onPress(e, g)
        // let cheakyE = e.nativeEvent.touches
        // console.log(cheakyE)
    }

    onPanResponderMove: ResponderHandler = (e, g) => {
        const { onMove } = this.props
        onMove && onMove(e, g)
        if (g.numberActiveTouches === 1 && this.props.enableMoving){
            this.updatePosition(g)
        }
        else if (g.numberActiveTouches === 2 && this.props.enableScalling){
            this.updateScale(e.nativeEvent.touches,g)
        }
    }

    setStyle = (nextStyles) => {
        const style = {...this.styles,...nextStyles}
        this.viewRef.setNativeProps({style})
        this.style = style
    }

    style = {
        position: 'absolute',
        top: this.props.x,
        left: this.props.y,
        width: this.props.width,
        height: this.props.height,
        borderWidth: this.props.debugMode ? 1 : 0,
        borderColor: this.props.debugMode ? 'red' : 'transparent',
    }

    // layout = {
    //     x: this.props.x,
    //     y: this.props.y,
    //     width: this.props.width,
    //     height: this.props.height,
    // }

    pos = {top: this.props.x, left: this.props.y}

    // Updates position on hold
    updatePosition = (g) => {
        var top = Math.max(10,Math.min(this.pos.top + g.dy,this.props.heightBoundingArea - 50))
        var left = Math.max(5,Math.min(this.pos.left + g.dx,this.props.widthBoundingArea - 50))
        this.setStyle({top, left})
        this.initialScale1 = null
        this.initialScale2 = null
    }
    // sets new value of this.pos
    setNewPosition= (g) => {
        this.pos = {top: this.pos.top + g.dy, left: this.pos.left + g.dx}
    }

    scale = {width: this.props.width, height: this.props.height}

    initialScale1 = null
    initialScale2 = null

    updateScale = (e,g) => {
        let scale = this.scale
        if (this.initialScale1 === null || this.initialScale2 === null){
            this.initialScale1 = {x: e[0].pageX, y: e[0].pageY}
            this.initialScale2 = {x: e[1].pageX, y: e[1].pageY}
            scale = {width: this.style.width, height: this.style.height}
        }

        if (this.initialScale1 !== null && this.initialScale2 !== null){
            let changeX1 = this.initialScale1.x - e[0].pageX
            let changeX2 = this.initialScale2.x - e[1].pageX
            let changeX = changeX1 + changeX2
            let changeY = this.initialScale1.y - e[0].pageY + this.initialScale2.y - e[1].pageY
            this.setStyle({width: scale.width - changeX, height: scale.height - changeY})
        }
    }

    setNewScale(e,g){
        //this.scale = {width: this.scale.width + g.dx, height: this.scale.height + g.dy}
        //this.scaleChange = null
    }

    //enable termination on unmount or something like that.
    onPanResponderTerminationRequest: ResponderShould = (e, g) => false

    onPanResponderRelease: ResponderHandler = (e, g) => {
        const { onRelease } = this.props
        onRelease && onRelease(e, g)
        this.setNewScale(e.nativeEvent,g)
        this.initialScale1 = null
        this.initialScale2 = null
        this.setNewPosition(g)
        this.scaleChange = null
        if (g.numberActiveTouches === 1){
        }
        else if (g.numberActiveTouches === 2){
        }
    }

    onPanResponderTerminate: ResponderHandler = (e, g) => {
        console.warn("TERMINATED")
    }
    onShouldBlockNativeResponder: ResponderShould = (e, g) => true

    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
        onStartShouldSetPanResponderCapture: this.onStartShouldSetPanResponderCapture,
        onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
        onMoveShouldSetPanResponderCapture: this.onMoveShouldSetPanResponderCapture,
        onPanResponderGrant: this.onPanResponderGrant,
        onPanResponderMove: this.onPanResponderMove,
        onPanResponderTerminationRequest: this.onPanResponderTerminationRequest,
        onPanResponderRelease: this.onPanResponderRelease,
        onPanResponderTerminate: this.onPanResponderTerminate,
        onShouldBlockNativeResponder: this.onShouldBlockNativeResponder,
    })

    viewRef: ViewRef
    viewRef = null

    handleRef = (r: ViewRef) => {
        const { getRef } = this.props
        this.viewRef = r
        getRef && getRef(r)
    }

    render() {
        const { children } = this.props

        return (
            <View
                ref={this.handleRef}
                {...this.panResponder.panHandlers}
                style={{...this.style}}>
                {children}
            </View>
        )
    }
}

export const TouchableResponderExample = () => (

    <View style={{flex: 1, backgroundColor: 'blue'}}>

        <TouchableResponder
            x={200}
            y={200}
            enableMoving={true}
            enableScalling={false}
            onPress={(e, g) => false && console.warn('onPress', g.dx, g.dy)}
            onMove={(e, g) => false && console.warn('moving', g.dx, g.dy)}
            onRelease={(e, g) => false && console.warn('released', g.dx, g.dy)} />

        <TouchableResponder
            x={0}
            y={0}
            enableMoving={true}
            enableScalling={true}
            onPress={(e, g) => false && console.warn('onPress', g.dx, g.dy)}
            onMove={(e, g) => false && console.warn('moving', g.dx, g.dy)}
            onRelease={(e, g) => false && console.warn('released', g.dx, g.dy)} />

    </View>

)

export default TouchableResponder
