// @flow
export default (...styles: Array<*>):Array<any> => (
    styles.reduce((result, style) => (
        Array.isArray(style)
        ? [...result, ...style]
        : [...result].concat(style)
    ), [])
)
