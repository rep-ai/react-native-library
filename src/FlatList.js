//@flow
import React, { PureComponent } from 'react'
import { FlatList } from 'react-native'
import checkType from 'check-types'

// NOTE: intentionally left absolute "|" symbols out of type definition
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
    keyExtractor?: (item: { id: string }, i: number) => string,
}

export default class FlatListPureComponent extends PureComponent<FlatListProps> {
    keyExtractor = (item: { id: string }, i: number): string => {
        const { keyExtractor } = this.props

        if (typeof keyExtractor === 'function') {
            return keyExtractor(item, i)
        }

        if (checkType.object(item)) {
            if (typeof item.id === 'string') {
                return item.id
            }
        }

        return i.toString()
    }

    render() {
        return (
            <FlatList
                keyExtractor={this.keyExtractor}
                {...this.props}
            />
        )
    }
}
