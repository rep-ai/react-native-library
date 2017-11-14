// @flow

import React, { Component } from 'react'
import {
    TouchableWithoutFeedback,
    View
} from 'react-native'

import UserListItem from './UserListItem'
import CheckBox from '../CheckBox'
import FlatList from '../FlatList'

type Props = {|
    data: any[],
    handleTouchItem: (index: number) => void,
    onEndReached?: () => void,
    onRefresh?: () => void,
    refreshing: bool,
    overlayColor: string,
|}

type State = {|
    data: any[]
|}

class UserList extends Component<Props, State> {
    state = {
        data: []
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data})
    }
 
    render() {
        const {
            data,
            handleTouchItem,
            onEndReached,
            onRefresh,
            refreshing,
            overlayColor
        } = this.props
        return (
            <FlatList
                data={data}
                extraData={this.state}
                onEndReached={onEndReached}
                onRefresh={onRefresh}
                refreshing={refreshing}
                renderItem={({item, index}) => {
                    const {
                        username,
                        avatar
                    } = item
                    const {checked} = this.state.data[index]
                    return (
                        <TouchableWithoutFeedback onPress={() => handleTouchItem(index)}>
                            <View>
                                <UserListItem
                                    username={username}
                                    team={item.activeTeamTitle}
                                    avatar={avatar}
                                    uri={avatar && avatar.uri}
                                    overlayColor={overlayColor}
                                />
                                <CheckBox 
                                    size={44}
                                    checked={checked}
                                    style={{position: 'absolute', right: 10, top: 10}}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }}                        
            />
        )
    }
}

export default UserList