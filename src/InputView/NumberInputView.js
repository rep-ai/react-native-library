import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
} from 'react-native'

import styles from './styles'
import PropTypes from 'prop-types';

export default class NumberInputView extends Component {
    static propTypes = {
        label: PropTypes.string,
        placeholder: PropTypes.string,

    }
    render() {
        return (
            <View style={[styles.ViewRow, this.props.contentContainerStyle]}>
                <Text style={[styles.Text, this.props.labelStyle]}>
                    {String(this.props.label).toUpperCase()}
                </Text>
                <TextInput
                    {...this.props}
                    {...this.props.values}
                    style={[styles.TextInput, this.props.style]}
                    placeholder={this.props.placeholder || ''}
                    placeholderTextColor={this.props.placeholderTextColor || '#ccc'}
                    onChangeText={this.props.onChangeText}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    keyboardType={'numeric'}
                />
                <View style={styles.line}/>
            </View>
        )
    }
}
