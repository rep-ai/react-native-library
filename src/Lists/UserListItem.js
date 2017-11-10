// @Flow
import React, { PureComponent } from 'react'
import {
	TouchableOpacity,
	View,
	StyleSheet,
} from 'react-native'

import AvatarView from '../AvatarView'
import colors from '../colors'
import Text from '../Text'

class UserListItem extends PureComponent {
    static defaultProps = {
        username: '',
        team: '',
        avatar: { uri: '' },
    }

    props: {
        username: string,
        handlePress: Function,
        team?: string,
        avatar?: { uri?: string },
    }

    state = { loading: false }

    state: { loading: bool }

    render(){
        const {
            username,
            team,
            avatar,
            handlePress,
        } = this.props

        return (
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.container}>
                    <AvatarView avatar={avatar} style={styles.avatarView} />
                    {team ? (
                        <View style={[styles.textContainer, styles.flex]}>
                            <View style={styles.flexEnd}>
                                <Text
                                    style={styles.usernameText}
                                    loading={this.state.loading}
                                    numberOfLines={2}>
                                    {username}
                                </Text>
                            </View>
                            <View style={styles.flex}>
                                <Text
                                    style={styles.teamText}
                                    loading={this.state.loading}
                                    loadingWidth={64}
                                    numberOfLines={2}>
                                    {team}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View style={[styles.textContainer, styles.flexCenter]}>
                            <Text
                                style={styles.usernameText}
                                loading={this.state.loading}
                                numberOfLines={2}>
                                {username}
                            </Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	flexCenter: {
		flex: 1,
		justifyContent: 'center',
	},
	flexEnd: {
		flex: 1,
		justifyContent: 'flex-end',
	},
    container: {
        flex: 1,
		flexDirection: 'row',
        marginHorizontal: 6,
    },
	avatarView: {
		marginVertical: 10,
		marginHorizontal: 14,
	},
    textContainer: {
        paddingRight: 36,
    },
	usernameText: {
		color: colors.main,
		fontSize: 15,
		fontWeight: '600',
	},
	teamText: {
		color: colors.grey,
		fontSize: 13,
	},
})
export const Example = () => (
    <UserListItem />
)

export default UserListItem
