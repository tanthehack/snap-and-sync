export const Storage = {
    setItem: (itemKey, itemValue) => {
        if (typeof itemValue === "object") {
            itemValue = JSON.stringify(itemValue);
        }
        window.localStorage.setItem(itemKey, itemValue);
    },
    /**
     * To help add an item to an array in localStorage
     * @param {string} itemKey the key to identify the object in storage
     * @param {object | string| array} itemValue the value to store
     * @returns {void | string} void if the itemvalue is stored in local storage, otherwise the stringified value
     */
    appendItem: (itemKey, itemValue) => {
        let initialItemValue = window.localStorage.getItem(itemKey);
        if (!initialItemValue) {
            initialItemValue = JSON.stringify([]);
            window.localStorage.setItem(itemKey, initialItemValue);
        }

        try {
            initialItemValue = JSON.parse(initialItemValue);
            let finalItemValue;
            if (Array.isArray(initialItemValue)) {
                initialItemValue.push(itemValue);

                finalItemValue = JSON.stringify(initialItemValue);
            } else return initialItemValue;
            window.localStorage.setItem(itemKey, finalItemValue);
        } catch (err) {
            return initialItemValue;
        }
    },

    subtractItem: (itemKey, itemValue) => {
        let initialItemValue = window.localStorage.getItem(itemKey);
        if (!initialItemValue) return;

        try {
            initialItemValue = JSON.parse(initialItemValue);
            let finalItemValue;
            if (Array.isArray(initialItemValue)) {
                // Filter out the item to subtract from array and return the remaining values
                let filteredValues = initialItemValue.filter((val) => {
                    if (typeof val === "object") {
                        return val[val.uniqueKey] !== itemValue[itemValue.uniqueKey]
                    }
                    return val !== itemValue;
                });

                if (!filteredValues) filteredValues = [];

                finalItemValue = JSON.stringify(filteredValues);
            } else return initialItemValue;
            window.localStorage.setItem(itemKey, finalItemValue);
        } catch (err) {
            return initialItemValue;
        }
    },

    getItem: (itemKey) => {
        const itemValue = window.localStorage.getItem(itemKey);
        if (!itemValue) return;

        try {
            return JSON.parse(itemValue);
        } catch (err) {
            return itemValue;
        }
    },

    removeItem: (itemKey) => {
        window.localStorage.removeItem(itemKey);
    },
    clearItem: () => {
        window.localStorage.clear();
    },
};