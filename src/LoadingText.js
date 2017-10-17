// @Flow
import React, { Component } from 'react'
import ProgressBar from 'react-native-progress/Bar'

import colors from '../colors'

export default class LoadingText extends Component {
    static defaultProps = {
        width: 110,
        height: 8,
        loading: true
    }

    props: {
        width: number,
        height: number,
        loading: bool,
    }

    render() {
        const {
            width,
            height,
            loading
        } = this.props

        return !loading ? null : (
            <ProgressBar
                style={{margin: 4}}
                borderWidth={0}
                indeterminate={true}
                color={colors.middleGrey}
                unfilledColor={colors.middleLightGrey}
                width={width}
                height={height}
                borderRadius={height / 2}
            />
        )
    }
}
