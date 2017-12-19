// @flow
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import ModalScreen from '../ModalScreen'
import capitalize from '../UtilityMethods/capitalize'
import styles, { triangleSize } from './styles'

export type Props = {|
    description: string,
    trianglePosition: 'top' | 'right' | 'bottom' | 'left' | 'none',
    visible?: bool,
    title?: string,
    onClose?: () => void,
|}

export default class Tooltip extends PureComponent<Props> {
    static defaultProps = { visible: true }

    render() {
        const {
            visible,
            title,
            description,
            trianglePosition,
            onClose,
        } = this.props

        return (
            <ModalScreen
                style={styles.container}
                touchingBackgroundShouldHide={true}
                visible={!!visible}
                onRequestClose={onClose}>
                <View>
                    <View style={[styles.innerContainer, trianglePosition === 'none' ? {} : {
                        [`margin${capitalize(trianglePosition)}`]: triangleSize,
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
