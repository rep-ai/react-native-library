// @flow
import type { Elevation, Style } from './flowTypes'
import { NetInfo } from 'react-native'

export const isConnectedResolver = (
    callback: () => any,
    handleTimeout: (timeout: number) => any
) => {
    try {
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                try {
                    if (typeof callback === 'function') {
                        callback()
                    } else {
                        console.warn(
                            `isConnectedResolver ERROR:`,
                            `callback is required to be a function.`)
                    }
                } catch (e) {
                    console.warn(e)
                }
            } else {
                try {
                    const timeout = setTimeout(() => {
                        try {
                            isConnectedResolver(callback, handleTimeout)
                        } catch (e) {
                            console.warn(
                                `isConnectedResolver ERROR:`,e)
                        }
                    }, 1000)

                    try {
                        if (typeof handleTimeout === 'function') {
                            handleTimeout(timeout)
                        } else {
                            console.warn(
                                `isConnectedResolver ERROR:`,
                                `handleTimeout is required to handle `,
                                `timeouts not calling unmounted components`
                            )
                        }
                    } catch (e) {
                        console.warn(
                            `isConnectedResolver ERROR:`,e)
                    }
                } catch (e) {
                    console.warn(
                        `isConnectedResolver ERROR:`,e)
                }
            }
        })
    } catch (e) {
        console.warn(
            `isConnectedResolver ERROR:`,e)
    }
}

export const elevationToShadowProps = (
    elevation: Elevation
) => ({
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.0015 * elevation + 0.18,
    shadowRadius: 0.54 * elevation,
    shadowOffset: {
        height: 0.6 * elevation,
    },
})

export const mergeStyles = (...styles: Style[]): Style => (
    styles.reduce((result, style) => (
        Array.isArray(style)
        ? [...result, ...style]
        : [...result, style || {}]
    ), [])
)

export const v4 = (a: any): string =>
a ? (a ^ Math.random() * 16 >> a / 4).toString(16)
: ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, v4)

export const dateTimeConvert = (date: Date = new Date()): string => (
    new Date(Date.parse(date)).toISOString()
)

export const dynamicDuration = (distance: number): number =>
    Math.round((distance + 450) * 15 / 38)
