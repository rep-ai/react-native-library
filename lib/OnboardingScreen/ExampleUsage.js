// @flow
import React, { Component } from 'react'
import { View } from 'react-native'
import OnboardingScreen from './index'

export default class ExampleUsage extends Component {
    state: { visible: bool }
    state = { visible: true }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <OnboardingScreen
                    visible={this.state.visible}
                    title={"Select the ball."}
                    description={
                        "Select where the ball is "
                        + "released in the video using the selection box.."
                    }
                    onClose={() => {
                        this.setState({ visible: false })
                    }}
                    imageSource={
                        require('../images/BallThrower.png')
                    }
                    iconSource={
                        require('../images/SelectionIconCircle.png')
                    }
                />
            </View>
        )

    }
}
