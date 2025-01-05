class CookieUtil {

    /**
     * Get cookie by name
     * @param {string} name - The name of the cookie to get.
     * @returns - The value of the cookie or `null` if the cookie doesn't exist
     */
    static get(name) {
        const cookies = document.cookie.split("; ");
        cookies.forEach(element => {
            if (element.decodeURIComponent(name) === name) {
                return decodeURIComponent(element.split("=")[1]);
            }
        })
        
        return null;
    }

    /**
   * Sets a cookie with the given name, value, and options.
   * @param {string} name - The name of the cookie.
   * @param {string} value - The value of the cookie.
   * @param {Object} [options={}] - Additional cookie options (e.g., expires, path).
   */
    static set(name, value, options = {}) {
        if (!name || typeof name !== "string") {
            throw new Error("Cookie name must be a non-empty string.");
        }

        const defaultOptions = {
            path: "/", // Default path to root
        };

        const finalOptions = { ...defaultOptions, ...options };

        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

        if (finalOptions.expires) {
            const expiresDate = finalOptions.expires instanceof Date ? finalOptions.expires.toUTCString() : new Date(finalOptions.expires).toUTCString();
            cookieString += `; expires=${expiresDate}`;
        }

        if (finalOptions.path) {
            cookieString += `; path=${finalOptions.path}`;
        }

        if (finalOptions.domain) {
            cookieString += `; domain=${finalOptions.domain}`;
        }

        if (finalOptions.secure) {
            cookieString += "; secure";
        }
        
        if (finalOptions.sameSite) {
            cookieString += `; samesite=${finalOptions.sameSite}`;
        }

        document.cookie = cookieString;
    }

    /**
   * Deletes a cookie by name.
   * @param {string} name - The name of the cookie to delete.
   * @param {Object} [options={}] - Additional options (e.g., path) for deletion.
   */
    static unset(name, options = {}) {
        this.set(name, "", { ...options, expires: new Date(0) });
    }
}