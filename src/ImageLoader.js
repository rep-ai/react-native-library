// @flow
import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, Image, Platform } from 'react-native'
import ImageProgress from 'react-native-image-progress'
import ProgressBar from 'react-native-progress/Bar'
import colors from './colors'
export type ResizeMode = 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'
import { mergeStyles } from './'

class ImageLoader extends Component {
    static defaultProps = {
        resizeMode: 'cover',
        indicatorProps: {},
        loading: false,
    }

    props: {
        source?: any,
        style?: *,
        uri?: string,
        resizeMode?: ResizeMode,
        onLoad?: Function,
        onError?: Function,
        indicatorProps: any,
        loading: bool,
    }

    state = {
        loading: this.props.loading
    }

    state: {
        loading: bool,
    }

    indicatorProps = {
        size: 80,
        borderWidth: 0,
        color: 'rgba(150, 150, 150, 1)',
        unfilledColor: 'rgba(200, 200, 200, .2)',
        ...this.props.indicatorProps,
    }

    handleError = (event?: any): any => {
        const {
            uri,
            onError,
        } = this.props

        this.setState({ loading: false })

        onError ? onError(event)
        : console.warn('ImageProgress onError: ', { uri, event })
    }

    render() {
        const {
            source,
            uri,
            resizeMode,
            onLoad,
            style,
        } = this.props

        if (Platform.OS === 'android') {
            return (
                <View style={mergeStyles( styles.imageLoader, style )}>
                    <Image
                        style={mergeStyles( styles.imageLoader, style )}
                        source={!source && !uri
                            ? require('../images/baseball-pitch.jpg') : source || { uri }}
                        onLoadStart={() => {
                            if (!source && !uri) {
                                return null
                            }

                            this.setState({ loading: true })
                        }}
                        onLoadEnd={() => {
                            this.setState({ loading: false })
                        }}
                        indicator={ProgressBar}
                        resizeMode={resizeMode}
                        onLoad={onLoad}
                        onError={this.handleError}
                    />
                    {this.state.loading && (
                        <View style={mergeStyles(styles.loadView, style,
                            {marginRight: 0, margin: 0},
                        )}>
                            <ActivityIndicator
                                size="small"
                                color={colors.main}
                            />
                        </View>
                    )}
                </View>
            )
        }

        return (
            <ImageProgress
                style={mergeStyles(
                    styles.imageLoader,
                    { backgroundColor: this.state.loading
                        ? '#f1f1f1' : 'transparent' },
                    style
                )}
                source={!source && !uri
                    ? require('../images/baseball-pitch.jpg') : source || { uri }}
                indicator={ProgressBar}
                resizeMode={resizeMode}
                onLoad={onLoad}
                onError={this.handleError}
                indicatorProps={this.indicatorProps}
            />
        )
    }
}

const styles = StyleSheet.create({
    imageLoader: {
        flex: 1,
        backgroundColor: 'transparent',
    },

    activityIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    loadView: {
        backgroundColor: '#f1f1f1',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ImageLoader
