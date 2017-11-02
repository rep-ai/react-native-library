//@flow
import React, { Component } from 'react'
import {
    View,
    Text,
} from 'react-native'

import ModalScreen from '../ModalScreen'
import styles from './styles'

type TooltipProps = {
    visible: bool,
    title?: string,
    description: string,
    onClose?: () => void,
    margin: number,
    justifyContent?: string,
    alignItems?: string,
    trianglePosition: 'top' | 'right' | 'bottom' | 'left' | 'none',
}

class Tooltip extends Component< TooltipProps > {
    static defaultProps = {
        margin: 140,
        alignItems: 'center',
        trianglePosition: 'bottom',
    }

    marginTop: number = 0
    marginRight: number = 0
    marginBottom: number = 0
    marginLeft: number = 0

    getFlexDirection = () => {
        const { trianglePosition } = this.props
        if (trianglePosition === 'left' || trianglePosition === 'right') {
            return 'row'
        } else return 'column'
    }

    getJustifyContent = () => {
        const { trianglePosition } = this.props
        if (trianglePosition === 'left' || trianglePosition === 'top') {
            return 'flex-start'
        } else if (trianglePosition === 'none') {
            return 'center'
        } else return 'flex-end'
    }

    getMargin = () => {
        const { trianglePosition, margin } = this.props
        switch (trianglePosition) {
            case 'top':
                this.marginTop = margin
                break
            case 'right':
                this.marginRight = margin
                break
            case 'bottom':
                this.marginBottom = margin
                break
            case 'left':
                this.marginLeft = margin
                break
            default:
                break
        }
    }


    render() {
        this.getMargin()
        const {
            visible,
            title,
            description,
            onClose,
            alignItems,
            trianglePosition,
        } = this.props

        const {
            marginBottom,
            marginTop,
            marginRight,
            marginLeft
        } = this

        const flexDirection = this.getFlexDirection()
        const justifyContent = this.props.justifyContent ? this.props.justifyContent : this.getJustifyContent()

        return (
            <ModalScreen 
                style={[
                    styles.flex,{
                        justifyContent,
                        alignItems,
                        marginTop,
                        marginRight,
                        marginBottom,
                        marginLeft,
                        flexDirection
                }]}
                touchingBackgroundShouldHide={true}
                visible={visible}
                onRequestClose={onClose}
            >

                {(trianglePosition === 'left' || trianglePosition === 'top') && (
                    <View style={styles[trianglePosition]} />
                )}
                
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                
                {(trianglePosition === 'right' || trianglePosition === 'bottom') && (
                    <View style={styles[trianglePosition]} />
                )}

            </ModalScreen>
        )
    }
}

export default Tooltip