// @flow
import React, { Component } from 'react'

import {
    View,
    Dimensions,
    ScrollView,
    Text,
    LayoutAnimation,
    TouchableWithoutFeedback,
} from 'react-native'

import colors from '../colors'
import styles from './styles'

export default class HorizontalTab extends Component {
    defaultProps = {
        dataSource: [],
        initialTabIndex: 0,
        tabUnderlineWidth: 2,
        tabUnderlineColor: colors.main,
        firstConfigured: false,
    }

    windowWidth = Dimensions.get('window').width

    _props = {
        ...this.defaultProps,
        ...this.props,
    }

    initialContentOffset = this.windowWidth
        * this._props.initialTabIndex

    state = {
        windowWidth: this.windowWidth,
        contentOffset: this.initialContentOffset,
        tabWidths: [],
        tabCounts: [],
        activeTabIndex: this._props.initialTabIndex,
        tabUnderlineWidth: this.windowWidth / this._props.dataSource.length,
    }

    LayoutAnimation = {
        duration: 500,

        create: {
            type: LayoutAnimation.Types.linear,
            property: LayoutAnimation.Properties.opacity,
        },

        update: {
            type: LayoutAnimation.Types.spring,
            springDamping: 0.6,
        },

        delete: {
            type: LayoutAnimation.Types.linear,
            property: LayoutAnimation.Properties.opacity,
        },
    }

    getActiveTabIndex() {
        const {
            windowWidth,
            contentOffset,
            tabWidths,
        } = this.state

        const { length } = this._props.dataSource
        const windowAndOffset = windowWidth + contentOffset

        const activeTabIndex = Math.round(windowAndOffset / windowWidth) - 1

        if (activeTabIndex === this.state.activeTabIndex) {
            return null
        }

        if (typeof tabWidths[activeTabIndex] === 'undefined') {
            return null
        }

        const reducedTabWidths = tabWidths.reduce((r, num) => r + num, 0)
        const remaining = windowWidth - reducedTabWidths
        const divisionOfWidths = remaining / length
        const tabUnderlineWidth = tabWidths[activeTabIndex] + divisionOfWidths

        // wait(() => this.setState({
        //     activeTabIndex,
        //     tabUnderlineWidth,
        // }, () => this.props.onChangeTab &&
        //     this.props.onChangeTab(activeTabIndex)
        // ))
    }

    handleTabLayout = ({ layout: { width  } }, i) => {
        this.setState(({ tabWidths = [] }) => {
            tabWidths[i] = width
            return {
                tabWidths
            }
        })
    }

    handleTabPress = i => {
        this.ScrollView.scrollTo({
            x: this.state.windowWidth * i,
            y: 0,
            animated: true
        })
    }

    renderTab = ({ title, count, i }) => {
        const tabTextStyleResult = [this._props.tabTextStyles]

        const tabCountStyleResult = [styles.tabCountStyles]
        tabCountStyleResult.push(this._props.tabTextStyles)
        tabCountStyleResult.push(this._props.tabCountStyles)

        if (this.state.activeTabIndex === i) {
            if (this._props.tabActiveTextStyles) {
                tabTextStyleResult.push(this._props.tabActiveTextStyles)
            }
        }

        count = count || this.state.tabCounts[i]

        if (this.props.noTabCounts) {
            count = ''
        }

        return (
            <TouchableWithoutFeedback
                key={i}
                onPress={() => this.handleTabPress(i)}
                onLayout={({nativeEvent}) =>
                    this.handleTabLayout(nativeEvent, i)
                }
            >
                <View style={[styles.tabStyles, this._props.tabStyles]}>
                    {
                        !!count && <Text style={tabCountStyleResult}>
                            {String(count)}
                        </Text>
                    }
                    <Text style={tabTextStyleResult}>{String(title)}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    renderTabs = () => this._props.dataSource.map(
        ({title, count}, i) => this.renderTab({
            count,
            title,
            i,
        })
    )

    renderUnderline = () => {
        if (this.props.renderUnderline) {
            return this.props.renderUnderline({
                width: this.state.tabUnderlineWidth,
                left: this.state.contentOffset / this._props.dataSource.length,
            })
        }

        return (
            <View style={[{
                height: this._props.tabUnderlineWidth,
                backgroundColor: this._props.tabUnderlineColor,
            }, this._props.tabUnderlineStyles, {
                width: this.state.tabUnderlineWidth,
                left: this.state.contentOffset / this._props.dataSource.length,
            }]} />
        )
    }

    render() {
        const { windowWidth } = this.state
        const { dataSource } = this._props
        const contentContainerWidth = windowWidth * dataSource.length

        this.getActiveTabIndex()

        const {
            contentContainerStyle,
            scrollViewBackgroundColor,
        } = this.props

        return (
            <View style={[styles.flex, contentContainerStyle]}>
                <View>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        bounces={false}
                        keyboardShouldPersistTaps="always"
                        contentContainerStyle={
                            styles.tabScrollViewcontentContainer}
                        style={{
                            backgroundColor: scrollViewBackgroundColor
                            || colors.main
                        }}
                    >
                        {this.renderTabs()}
                    </ScrollView>
                    {this.renderUnderline()}
                </View>

                <ScrollView
                    ref={r => {
                        this.ScrollView = r
                    }}
                    scrollEventThrottle={16}
                    onScroll={({nativeEvent: {contentOffset: {x}}}) =>
                        this.setState({contentOffset: x})
                    }
                    contentContainerStyle={[styles.flex, {
                        width: contentContainerWidth,
                    }, this.props.scrollViewContentContainerStyle]}
                    contentOffset={{x: this.initialContentOffset}}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                    enableEmptySections={true}>{dataSource.map(
                        (mappedProps, i) => this._props
                            .renderRow(mappedProps, 1, i)
                    )}</ScrollView>
            </View>
        )
    }
}
