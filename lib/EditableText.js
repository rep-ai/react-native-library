// @flow
import React, { PureComponent } from 'react'

import {
	Text,
	View,
	TextInput,
	StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'

export default class EditableText extends PureComponent {
    static defaultProps = {
        placeholderTextColor: '#ccc',
        labelTextColor: '#777',
        editable: true,
        returnKeyType: 'done',
        fontSize: 16,
        color: '#333',
    }

    props: {
        editable: bool,
        style?: Object | Object[],
        color?: string,
        fontSize?: number,
        placeholder?: mixed,
        placeholderTextColor?: string,
        labelTextColor?: string,
        label?: string,
        defaultValue?: string,
        units?: string,
        selectionColor?: string,
        maxLength?: number,
        getRef?: (ref: any) => any,
        onFocus?: (event: Object) => any,
        onBlur?: (event: Object) => any,
        onChangeText?: (text: string) => any,
        onSubmitEditing?: (text: string) => any,
        keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search',
        returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send' | 'none' | 'previous' | 'default' | 'emergency-call' | 'google' | 'join' | 'route' | 'yahoo',
    }

    state: { text: string } = { text: this.props.defaultValue || '' }
    textRef: any
    render() {
        const {
            label,
            defaultValue,
            units,
            labelTextColor,
            placeholderTextColor,
            placeholder,
            editable,
            onChangeText,
            onSubmitEditing,
            keyboardType,
            returnKeyType,
            maxLength,
            fontSize,
            color,
            style,
            onFocus,
            onBlur,
            getRef,
        } = this.props

        if (!editable && !defaultValue) {
            return null
        }

        return (
            <TouchableWithoutFeedback onPress={() => {
                this.textRef.focus()
            }}>
                <View style={[styles.flexRow].concat(style)}>
                    {!!label && <Text style={{
                        color: labelTextColor,
                        fontSize
                    }}>{label}</Text>}
                    <View style={styles.flexRow}>
                    {// Text is there to set width for TextInput
                    }
                        <Text style={{ fontSize }}>
                            {this.state.text || placeholder || ` `}
                        </Text>
                        <TextInput
                            style={[styles.input, { fontSize, color }]}
                            editable={editable}
                            defaultValue={defaultValue}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            placeholderTextColor={placeholderTextColor}
                            returnKeyType={returnKeyType}
                            keyboardType={keyboardType}
                            maxLength={maxLength}
                            value={this.state.text}
                            onSubmitEditing={() => {
                                !!onSubmitEditing && onSubmitEditing(this.state.text)
                            }}
                            onChangeText={(text: string) => {
                                this.setState({ text: onChangeText ? onChangeText(text) : text })
                            }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            underlineColorAndroid="transparent"
                            ref={r => {
                                this.textRef = r
                                !!getRef && getRef(r)
                            }}
                        />
                    </View>
                    {!!units && <Text style={{
                        color: labelTextColor,
                        fontSize,
                    }}>{units}</Text>}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    // position absolute will break the view of textInput. Will need to be removed when we finally fix this.
    input: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
})
