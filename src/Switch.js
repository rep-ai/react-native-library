// @flow
import React, { Component } from 'react'

import {
     Text,
     StyleSheet,
      View,
      Switch,
   } from 'react-native'

import PropTypes from 'prop-types'

export default class SwitchComponent extends Component{
    static propTypes = {
        title: PropTypes.string,
        onValueChangee: PropTypes.func.isRequired,
    }

    render() {
        return ( //this.props.containerStlyes
            <View style={[styles.horizontal,this.props.containerStyles]}>
                <Switch
                    {...this.props}
                />
                <Text>{this.props.title}</Text>
            </View>
        )
    }

}


const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    padding: 8,
  },
});
