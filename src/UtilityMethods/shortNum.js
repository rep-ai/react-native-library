export default (num) => {
    const type = ["", " k", " m"]
    const typeindex = Math.floor(("" + num).length / 3)
    let shortnum = parseFloat((typeindex !== 0 ? (num / Math.pow(1000, typeindex)) : num).toPrecision(2))
    return shortnum + type[typeindex]
}