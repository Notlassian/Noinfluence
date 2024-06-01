export function buildUniqueMap(array, keyProp, valueProp) {
    return array.reduce((acc, item) => {
        const key = item[keyProp];
        const value = item[valueProp];

        if (!acc[key]) {
            acc[key] = [];
        }
        if (!acc[key].includes(value)) {
            acc[key].push(value);
        }
        return acc;
    }, {});
}
