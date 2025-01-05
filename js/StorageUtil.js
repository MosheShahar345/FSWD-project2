class StorageUtil {
    /**
     * Saves data to local storage under a specific key.
     * @param {string} key - The key under which the data is stored.
     * @param {any} value - The data to store. It will be stringified.
     */
    static save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Fetches data from local storage for a specific key.
     * @param {string} key - The key to retrieve data from.
     * @returns {any} - The parsed data or `null` if the key doesn't exist.
     */
    static fetch(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    /**
     * Deletes data from local storage for a specific key.
     * @param {string} key - The key to delete.
     */
    static delete(key) {
        localStorage.removeItem(key);
    }
}
