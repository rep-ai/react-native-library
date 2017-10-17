// @flow
import React, { Component } from 'react'

import {
    View,
    Image,
    Text,
} from 'react-native'

import Button from '../Button'
import styles from './styles'
import ModalScreen from '../ModalScreen'

class OnboardingScreen extends Component {
    props: {
        visible: bool,
        title: string,
        description: string,
        closeButtonText?: string,
        onClose: () => void,
        secondButtonText?: string,
        secondButtonOnPress?: () => void,
        iconSource: any,
        imageSource?: any,
    }

    render() {
        const {
            title,
            description,
            closeButtonText,
            onClose,
            secondButtonText,
            secondButtonOnPress,
            iconSource,
            imageSource,
            visible,
        } = this.props

        return (
            <ModalScreen
                style={styles.flexCenter}
                touchingBackgroundShouldHide={true}
                visible={visible}
                onRequestClose={() => this.setState({visible: false})}>
                <View style={styles.innerContainer}>
                    <Image
                        resizeMode={'contain'}
                        source={iconSource}
                        defaultSource={iconSource}
                        style={styles.headerImageContainer}
                    />

                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>

                    {imageSource && (
                        <Image
                            resizeMode={'contain'}
                            source={imageSource}
                            style={styles.image}
                        />
                    )}

                    <View style={styles.buttonRow}>
                        <Button
                            style={styles.flex}
                            title={closeButtonText}
                            onPress={onClose}
                        />

                        {secondButtonOnPress && (
                            <View style={{width: 8}}/>
                        )}
                        {secondButtonOnPress && (
                            <Button
                                style={styles.flex}
                                title={secondButtonText}
                                onPress={secondButtonOnPress}
                            />
                        )}
                    </View>
                </View>
            </ModalScreen>
        )
    }
}

export default OnboardingScreen
