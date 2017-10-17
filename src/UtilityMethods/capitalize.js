// @flow
export default (s: string): string =>
    `${s.charAt(0).toUpperCase()}${s.slice(1)}`
