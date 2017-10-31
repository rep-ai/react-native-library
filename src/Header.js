// @flow
import React from 'react'
import { View, Text } from 'react-native'

import { _CheckButton, _BackButton } from './HeaderButtons'
import colors from './colors'

export default ({ title, onClose, onCheck }) => {
    return (
        <View style={{
            width: '100%',
            height: 64,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.main,
            flexDirection: 'row'
        }}>
            {!!onClose && <_BackButton 
                onPress={onClose}
                style={{position: 'absolute', left: 10, backgroundColor: 'transparent'}}
            />}
            <Text style={{
                fontWeight: '500',
                color: 'white',
                fontSize: 18,
                marginBottom: -15
            }}>{title}</Text>
            {!!onCheck && <_CheckButton 
                onPress={onCheck}
                style={{position: 'absolute', right: 10, backgroundColor: 'transparent'}}
            />}
        </View>
    )
}