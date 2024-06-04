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
export function buildObjectMap(array, keyProp) {
    return array.reduce((acc, item) => {
        const key = item[keyProp];
        const { [keyProp]: _, ...rest } = item;

        if (!acc[key]) {
            acc[key] = [];
        }
        if (
            !acc[key].find((obj) =>
                Object.keys(rest).every((prop) => obj[prop] === rest[prop])
            )
        ) {
            acc[key].push(rest);
        }
        return acc;
    }, {});
}
