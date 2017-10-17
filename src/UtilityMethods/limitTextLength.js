// @flow
// TODO: use ellipsizeMode numberOfLines adjustsFontSizeToFit
// ellipsizeMode
// http://facebook.github.io/react-native/releases/0.45/docs/text.html#ellipsizemode
// numberOfLines
// http://facebook.github.io/react-native/releases/0.45/docs/text.html#numberoflines
// adjustsFontSizeToFit
// http://facebook.github.io/react-native/releases/0.45/docs/text.html#adjustsfontsizetofit
export default (text: string, limit?: number): string =>
    `${String(text).substring(0, limit)}${
        Number(String(text).length) > Number(limit) ? '...' : ''}`
