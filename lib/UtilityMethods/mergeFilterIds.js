// @flow
export type IdObject = { id: string }

export type InputArray = Array<IdObject>
const idReducer = (array: Array<{id: string}>, initialObject: any = {}): any =>
    array.reduce((obj, item) => (
        { ...obj, [item.id]: {...item} }
    ), initialObject)


const mergeFilterIds = (array1: InputArray, array2: InputArray): Array<any> => {
    if (!Array.isArray(array1) && !Array.isArray(array2)) {
        return []
    }

    if (!Array.isArray(array1) && Array.isArray(array2)) {
        return array2.concat()
    }

    if (!Array.isArray(array2) && Array.isArray(array1)) {
        return array1.concat()
    }

    const objectFilter = idReducer(array2, idReducer(array1))

    return Object.keys(objectFilter).map(key => ({ ...objectFilter[key] }))
}

export default mergeFilterIds
