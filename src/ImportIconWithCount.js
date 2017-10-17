// @flow
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import Svg, { Polyline } from 'react-native-svg'

class Poly extends PureComponent {
	static defaultProps = {
		width: '19',
		height: '16',
		rotate: '0deg',
		translateX: 0,
        stroke: 'white',
        strokeWidth: 2.5
	}

	props: {
		width: number,
		height: number,
		rotate: string,
		translateX: number,
        stroke: string,
        strokeWidth: number,
	}

	render() {
		const {
			rotate,
            translateX,
            stroke,
            width,
            height,
            strokeWidth,
		} = this.props

		return (
			<Svg width={width} height={height} style={{
                position: 'absolute',
                transform: [{rotate}, {translateX}]
            }}>
                <Polyline
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={[2,5.5,5.5,2,9,5.5,5.5,2,5.5,14,16.5,14]}
                />
            </Svg>
		)
	}
}

export default class ImportIconWithCount extends PureComponent {
    static defaultProps = {
        value: '2k',
        size: 16,
        color: 'white',
        fontWeight: '500',
    }

    props: {
        value: mixed,
        size: number,
        color: string,
        fontWeight: string,
        style?: any,
    }

	render() {
        const {
        	style,
        	value,
        	size,
        	color,
            fontWeight,
        } = this.props

		return (
			<View style={[{
                alignItems: 'center',
                justifyContent: 'center',
            }].concat(style)}>
                {!!value && (
                    <Text style={{
                        fontWeight,
                        fontSize: size + 4,
                        paddingBottom: 4,
                        color
                    }}>{value}</Text>
                )}
                <View style={{ width: size + 3, height: size }}>
                    <Poly
                        width={size + 3}
                        height={size}
                        translateX={-2}
                        stroke={color}
                    />
                    <Poly
                        width={size + 3}
                        height={size}
                        translateX={-8}
                        rotate={"180deg"}
                        stroke={color}
                    />
                </View>
            </View>
		)
	}
}
