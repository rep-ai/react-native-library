// @flow
import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'

import colors from '../colors'
import styles from '../styles'

import UserList from './UserList'
import HorizontalIconsList from './HorizontalIconsList'

type StoryUserListProps = {|
    data: any[],
    buttonText: string,
    onDone: (items: any[]) => void,
    handleRefresh?: () => void,
    handleEndReached?: () => void,
|}

type StoryUserListState = {|
    data: any[],
    checkedItems: any[],
    refreshing: bool,
|}

class StoryUserList extends Component<StoryUserListProps, StoryUserListState> {
    static defaultProps = {
        buttonText: 'OK'
    }

    state = {
        data: this.props.data || [],
        checkedItems: [],
        refreshing: false,
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({data: nextProps.data})
        }
    }

    handleTouchItem = (index: number) => {
        this.state.data[index].checked ? this.removeChecked(index) : this.addChecked(index)
    }

    addChecked = (index: number) => {
        let { data, checkedItems } = this.state
        data[index].checked = true
        checkedItems.push(data[index])
        
        // values set here
        this.setState({ data, checkedItems })
    }

    removeChecked = (index: number) => {
        let { data, checkedItems } = this.state
        data[index].checked = false
        let newCheckedItems = checkedItems.filter((item) => {
            return item.id !== data[index].id
        })

        // values set here
        this.setState({ data, checkedItems: newCheckedItems })
    }

    render() {
        const { 
            data,
            onDone,
            handleRefresh,
            handleEndReached,
            buttonText,
        } = this.props

        console.log('data',data)

        return (
            <View style={styles.flexStart}>
                <View style={styles.flex}>
                    <UserList 
                        data={this.state.data}
                        handleTouchItem={this.handleTouchItem}
                        onRefresh={handleRefresh}
                        refreshing={this.state.refreshing}
                        onEndReached={handleEndReached}
                        overlayColor="transparent"
                    />
                </View>
                <View style={{height: 64, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={[styles.flex, {alignContent: 'center'}]}>
                        <HorizontalIconsList 
                            data={this.state.checkedItems}
                            size={33}
                            overlayColor="transparent"
                        />
                    </View>
                    <TouchableOpacity
                        style={{backgroundColor: colors.main, marginRight: 10, width: 100, height: 32, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => onDone(this.state.checkedItems)}
                    >
                        <Text style={{color: 'white'}}>
                            {buttonText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default StoryUserList