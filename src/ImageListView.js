// @flow
import React, { Component } from 'react'
import { ListView, Dimensions, ScrollView } from 'react-native'
import ImageLoader from './ImageLoader'

export default class ImageListView extends Component {
    constructor(props) {
        super(props)

        const DataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })

        this.state = {
            dataSource: DataSource.cloneWithRows(
                this.props.collection
            ),
            lastLoadedRowId: 0,
            sizes: [],
        }

        // this.renderRow = this.renderRow.bind(this)
    }

    width = Dimensions.get('window').width
    renderRow = (uri, sectionId, rowId) => {
        return <ImageLoader
            uri={uri}
            style={{
                width: this.width,
                height: 240,
                marginVertical: 2,
            }}
        />
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderScrollComponent={props =>
                    <ScrollView
                        {...props}
                        pagingEnabled={true}
                    />
                }
            />
        )
    }
}
