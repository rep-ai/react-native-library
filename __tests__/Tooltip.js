import 'react-native'
import React from 'react'
import Tooltip from '../src/Tooltip'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'
const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`

it('renders correctly', () => {
    // NOTE: Bugged test.
    ['top', 'left', 'bottom', 'right'].map((trianglePosition) => {
        const tree = renderer.create(
            <Tooltip
                description={text}
                trianglePosition={trianglePosition}
            />
        )

        expect(tree.toJSON()).toMatchSnapshot()

        return null
    })
})
