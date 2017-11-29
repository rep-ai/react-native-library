// @flow
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import ModalScreen from '../ModalScreen'
import capitalize from '../UtilityMethods/capitalize'
import styles, { triangleSize } from './styles'
import type { TooltipProps } from './flowTypes'

export default class Tooltip extends PureComponent<TooltipProps> {
    static defaultProps = {
        visible: true,
    }

    render() {
        const {
            visible,
            title,
            description,
            trianglePosition,
            offset,
            onClose,
        } = this.props

        return (
            <ModalScreen
                style={styles.container}
                touchingBackgroundShouldHide={true}
                visible={visible}
                onRequestClose={onClose}>
                <View>
                    <View style={[styles.innerContainer, trianglePosition === 'none' ? {} : {
                        [`margin${capitalize(trianglePosition)}`]: Number(offset) + triangleSize,
                    }]}>
                        <View style={[styles.triangle, styles[trianglePosition]]} />
                        {!!title && <Text style={[styles.text, styles.title]}>{title}</Text>}
                        <Text style={styles.text}>{description}</Text>
                    </View>
                </View>
            </ModalScreen>
        )
    }
}
