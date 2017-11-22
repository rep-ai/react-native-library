// @flow
import React, { PureComponent } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import AvatarView from '../AvatarView'
import FlatList from '../FlatList'

type Props = {|
    data: any,
    size: number,
    showsHorizontalScrollIndicator: bool,
    overlayColor: string
|}

type State = {|
    data: any[]
|}

class HorizontalIconsList extends PureComponent<Props, State> {
    static defaultProps = {
        size: 33,
        showsHorizontalScrollIndicator: false,
        overlayColor: 'white'
    }

    state = {
        data: []
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data})
    }
 
    render() {
        const {
            size,
            showsHorizontalScrollIndicator,
            overlayColor,
            data,
        } = this.props
        return (
            <FlatList
                style={{marginLeft: 11.5}}
                horizontal={true}
                showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
                data={data}
                extraData={this.state}
                renderItem={( {item, index} ) => {
                    const { avatar } = item
                    return (
                        <AvatarView
                            avatar={avatar}
                            size={size}
                            style={
                                styles.avatarView
                            }
                            overlayColor={overlayColor}
                        />
                    )
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    avatarView: {
		marginVertical: 10,
		marginHorizontal: 10,
    },
})

export default HorizontalIconsList

