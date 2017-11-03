// @flow
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import ModalScreen from '../ModalScreen'
import capitalize from '../UtilityMethods/capitalize'
import styles, { triangleSize } from './styles'

type TooltipProps = {|
    visible: bool,
    offset?: number,
    title?: string,
    description: string,
    trianglePosition: 'top' | 'right' | 'bottom' | 'left' | 'none',
    onClose?: () => void,
    style?: *,
|}

class Tooltip extends PureComponent<TooltipProps> {
    static defaultProps = {
        visible: true,
    }

    render() {
        const {
            visible,
            title,
            description,
            onClose,
            trianglePosition,
            style,
            offset,
        } = this.props

        return (
            <ModalScreen
                style={[styles.container].concat(style)}
                touchingBackgroundShouldHide={true}
                visible={visible}
                onRequestClose={onClose}>
                <View style={[styles.innerContainer, trianglePosition === 'none' ? {} : {
                    [`margin${capitalize(trianglePosition)}`]: Number(offset) + triangleSize,
                }]}>
                    <View style={[styles.triangle, styles[trianglePosition]]} />
                    {!!title && <Text style={[styles.text, styles.title]}>{title}</Text>}
                    <Text style={styles.text}>{description}</Text>
                </View>
            </ModalScreen>
        )
    }
}

export default Tooltip
