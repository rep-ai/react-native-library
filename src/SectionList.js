// Copyright (c) 2016-present, ATHLYST , Inc.
// @flow
import React, { Component } from 'react'
import { SectionList, View } from 'react-native'

export type RenderItemSeparators = {
    highlight: () => void,
    unhighlight: () => void,
    updateProps: (select: 'leading' | 'trailing', newProps: Object) => void,
}

export type RenderItemInfo = {
    item: any,
    index: number,
    section: SectionListProps,
    separators: RenderItemSeparators,
}

export type SectionListProps = {
	data: Array <any>,
	// Optional key to keep track of section re-ordering,
	// the array index will be used by default.
	key?: string,

	// Optional props will override list-wide props just for this section.
	renderItem?: ?(info: RenderItemInfo) => ?React.Element<any>,
    ItemSeparatorComponent?: ?ReactClass<any>,
    // automatic
    keyExtractor?: (item: { id: string } ) => string,
}

type Props = {
    sections: Array<any>,
  renderItem: (info: {
    item: any,
    index: number,
    section: any,
    separators: RenderItemSeparators,
  }) => ?React.Element<any>,
  ItemSeparatorComponent?: ?ReactClass<any>,
  ListHeaderComponent?: ?(ReactClass<any> | React.Element<any>),
  ListEmptyComponent?: ?(ReactClass<any> | React.Element<any>),
  ListFooterComponent?: ?(ReactClass<any> | React.Element<any>),
  SectionSeparatorComponent?: ?ReactClass<any>,
  extraData?: any,
  initialNumToRender: number,
  keyExtractor: (item: any, index: number) => string,
  onEndReached?: ?(info: { distanceFromEnd: number }) => void,
  onEndReachedThreshold?: ?number,
  onRefresh?: ?() => void,

  refreshing?: ?boolean,
  removeClippedSubviews?: boolean,
  renderSectionHeader?: ?(info: {section: any}) => ?React.Element<any>,
  renderSectionFooter?: ?(info: {section: any}) => ?React.Element<any>,
  stickySectionHeadersEnabled?: boolean,
}

import CT from 'check-types'
export type ItemIdType = { id: string }

export const ItemIdCheck = (item: ItemIdType): bool =>
    CT.all(CT.map(item, { id: CT.string }))

export const keyExtractor = (item: ItemIdType, index: number): string =>
    `${ItemIdCheck(item) ? item.id : index}`

import Title from './Title'
import Text from './Text'
export const defaultProps = {
    initialNumToRender: 10,
    stickySectionHeadersEnabled: true,
    onEndReachedThreshold: 0.5,
    keyExtractor,
    renderSectionHeader: (
        { section: { title } }: { section: { title: string } }
    ) => (
        <Title style={{
            paddingVertical: 8,
            marginLeft: 8,
            paddingLeft: 0,
        }}>{title}</Title>
    ),
    renderItem: ({ item }: { item: ItemIdType }) =>
    <Text style={{
        padding: 12,
    }}>{`id: ${ItemIdCheck(item) ? item.id : 'No id'}`}</Text>
}

type DefaultProps = typeof defaultProps

class SectionListComponent extends Component {
    static defaultProps: DefaultProps = defaultProps
    props: Props

  _wrapperListRef: SectionList<any>
  _captureRef = (ref) => {
      this._wrapperListRef = ref
  }

  render() {
      return (
          <SectionList {...this.props} ref={this._captureRef} />
      )
  }
}

export default SectionListComponent

export const createData = (amount: number = 10): Array<ItemIdType> => (
    Array(amount).fill('').map((_, i) => ({
        id: `${i}`
    }))
)



export class SectionListExampleUsage extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <SectionListComponent
                    style={{ backgroundColor: 'white' }}
                      sections={
                          Array(50).fill('').map((_, i) => ({
                              title: `Title: ${i}`,
                              data: createData(),
                          }))
                      }
                />
            </View>
        )
    }
}
