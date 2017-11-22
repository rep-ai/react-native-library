// @flow

import React, { Component } from 'react'
import {
    TouchableWithoutFeedback,
    View,
    StyleSheet
} from 'react-native'

import CheckBox from '../CheckBox'
import FlatList from '../FlatList'
import Button from '../Button'

import UserListItem from './UserListItem'

type Props = {|
    data: any[],
    handleTouchItem: (index: number) => void,
    onEndReached?: () => void,
    onRefresh?: () => void,
    refreshing: bool,
    overlayColor: string,
    component?: 'button' | 'checkbox',
    selectedText: string,
    unselectedText: string
|}

type State = {|
    data: any[]
|}

class UserList extends Component<Props, State> {
    static defaultProps = {
        component: 'checkbox',
        selectedText: 'remove',
        unselectedText: 'add'
    }

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
            overlayColor,
            component,
            selectedText,
            unselectedText
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
                    if ( component === 'checkbox'){
                        return (
                            <View>
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
                                            style={styles.checkPosition}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )
                    }
                    if (component === 'button') {
                    return (
                        <View>
                            <UserListItem
                                username={username}
                                team={item.activeTeamTitle}
                                avatar={avatar}
                                uri={avatar && avatar.uri}
                                overlayColor={overlayColor}
                            />
                            <Button 
                                title={checked ? selectedText : unselectedText}
                                onPress={() => handleTouchItem(index)}
                                style={[styles.button, styles.checkPosition]}
                                fontSize={14}
                                borderRadius={0}
                                invertColors={!checked}
                            />
                        </View>
                    )
                }}}                   
            />
        )
    }
}

export default UserList

const styles = StyleSheet.create({
    button: {
        width: 90,
        height: 35,
    },
    checkPosition: {
        position: 'absolute',
        right: 10,
        top: 17.5
    },
    buttonPosition: {
        position: 'absolute',
        right: 0,
        top: 0
    }
})