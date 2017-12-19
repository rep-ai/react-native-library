//@flow
// NOTE: Using require here allows use of flow types such as React.ComponentType
import * as React from 'react'
import { PureComponent } from 'react'
import { FlatList } from 'react-native'
import checkType from 'check-types'
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import type { ViewToken } from 'react-native/Libraries/Lists/ViewabilityHelper'

export type FlatListProps<ItemT> = {
    data: ItemT[],
    renderItem: (info: {
        item: ItemT,
        index: number,
        separators: {
            highlight: () => void,
            unhighlight: () => void,
            updateProps: (select: 'leading' | 'trailing', newProps: Object) => void,
        },
    }) => ?React.Element<any>,
    ItemSeparatorComponent?: ?React.ComponentType<any>,
    ListEmptyComponent?: ?(React.ComponentType<any> | React.Element<any>),
    ListFooterComponent?: ?(React.ComponentType<any> | React.Element<any>),
    ListHeaderComponent?: ?(React.ComponentType<any> | React.Element<any>),
    columnWrapperStyle?: StyleObj,
    extraData?: any,
    getItemLayout?: (
        data: ?Array<ItemT>,
        index: number
    ) => { length: number, offset: number, index: number },
    horizontal?: ?boolean,
    initialScrollIndex?: ?number,
    inverted?: ?boolean,
    numColumns?: number,
    onEndReached?: ?(info: { distanceFromEnd: number }) => void,
    onEndReachedThreshold?: number,
    onRefresh?: ?() => void,
    onViewableItemsChanged?: ?(info: {
        viewableItems: Array<ViewToken>,
        changed: Array<ViewToken>,
    }) => void,
    progressViewOffset?: number,
    legacyImplementation?: ?boolean,
    refreshing?: ?boolean,
    removeClippedSubviews?: boolean,
}

export default class FlatListPureComponent<ItemT> extends PureComponent<FlatListProps<ItemT>> {
    static defaultProps = {
        keyExtractor: (item: ItemT & { id: string }, index: number): string => {
            if (checkType.object(item)) {
                if (typeof item.id === 'string') {
                    return String(item.id)
                }
            }

            return index.toString()
        },
    }

    render() {
        return <FlatList {...this.props} />
    }
}
