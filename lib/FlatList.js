//@flow
import React, { PureComponent } from 'react'
import { FlatList } from 'react-native'

export default class FlatListPureComponent extends PureComponent {
	keyExtractor = (item: { id: string }) => item.id

	render() {
		return (
            <FlatList
                keyExtractor={this.keyExtractor}
                {...this.props}
            />
		)
	}
}
