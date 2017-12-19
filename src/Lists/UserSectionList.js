// @flow

import React, { Component } from 'react'
import {
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    SectionList,
} from 'react-native'

import CheckBox from '../CheckBox'
import Button from '../Button'
import Title from '../Title'

import UserListItem from './UserListItem'

type Props = {|
    sections: Array<{
        data: any[],
        title: string
    }>,
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
    sections: any[]
|}

class UserSectionList extends Component<Props, State> {
    static defaultProps = {
        component: 'checkbox',
        selectedText: 'remove',
        unselectedText: 'add'
    }

    constructor(props) {
        super(props)
        this.state = {
            sections: this.props.sections
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({sections: nextProps.sections})
    }
 
    render() {
        const {
            sections,
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
            <SectionList
                sections={sections}
                extraData={this.state}
                onEndReached={onEndReached}
                onRefresh={onRefresh}
                refreshing={refreshing}
                renderSectionHeader={({section}) => (
                    <Title>
                        {section.title}
                    </Title>
                )}
                renderItem={({item, section, index, separators}) => {
                    const {
                        username,
                        avatar,
                        checked
                    } = item

                    if (section.component === 'checkbox'){
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
                    if (section.component === 'button') {
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
                                    color={section.buttonColor ? section.buttonColor : colors.main}
                                    activeBackgroundColor={section.buttonColor ? section.buttonColor : colors.main}
                                    borderColor={section.buttonColor ? section.buttonColor : colors.main}
                                    title={checked ? section.selectedText : section.unselectedText}
                                    onPress={() => handleTouchItem(index)}
                                    style={[styles.button, styles.checkPosition]}
                                    fontSize={14}
                                    borderRadius={0}
                                    invertColors={!checked}
                                />
                            </View>
                        )}
                }}                   
            />
        )
    }
}

export default UserSectionList

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