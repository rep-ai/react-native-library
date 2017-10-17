export type Touch = NativeEvent
export type NativeEvent = {
    changedTouches: Touch[],
    locationX: number,
    locationY: number,
    pageX: number,
    pageY: number,
    target: number,
    timestamp: number,
    identifier: mixed,
    touches: Touch[],
}

export type Event = { nativeEvent: NativeEvent }
export type Gesture = {
    stateID: mixed,
    moveX: number,
    moveY: number,
    x0: number,
    y0: number,
    dx: number,
    dy: number,
    vx: number,
    vy: number,
    numberActiveTouches: number,
}

export type ResponderHandler = (event: Event, gesture: Gesture) => void
export type ResponderShould = (event: Event, gesture: Gesture) => bool
export type ViewRef = any
export type Position = { top: number, left: number }
export type TouchableArea = { width: number, height: number }
export type BoundingArea = { top: number, left: number, bottom: number, right: number }

export type Layout = {x: number, y: number, width: number, height: number}
export type LayoutNativeEvent = { layout: Layout }
export type LayoutEvent = {nativeEvent: LayoutNativeEvent}