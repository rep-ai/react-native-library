//@flow
import React, { PureComponent } from 'react'
import { FlatList } from 'react-native'

// intentionally left absolute "|" symbols out of type definition
type FlatListProps = {
	data: any[],
	renderItem: () => any,
	getItemCount?: () => any,
	getItem?: () => any,
	extraData?: any,
	onEndReached?: () => void,
	onEndReachThreshold?: number,
	contentContainerStyle?: any,
	horizontal?: bool,
	onScroll?: () => any,
	style?: any,
	keyExtractor: () => any,
}

export default class FlatListPureComponent extends PureComponent<FlatListProps> {
	keyExtractor = this.props.keyExtractor ? this.props.keyExtractor 
		: (item: { id: string }) => item.id

	render() {
		return (
            <FlatList
                keyExtractor={this.keyExtractor}
                {...this.props}
            />
		)
	}
}