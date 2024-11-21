/**
 * QueryHandler.js
 * A versatile JavaScript library for handling URL query parameters.
 * Supports dynamic iframe URL setting, page redirection, and link generation.
 */

const QueryHandler = {
    /**
     * Get all query parameters from the current URL as an object.
     * @returns {Object} - An object containing key-value pairs of query parameters.
     */
    getAllQueryParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        params.forEach((value, key) => {
            result[key] = value;
        });
        return result;
    },

    /**
     * Append query parameters to a base URL.
     * @param {string} baseUrl - The base URL (e.g., https://example.com).
     * @param {Object} params - An object containing key-value pairs of query parameters.
     * @returns {string} - The resulting URL with query parameters appended.
     */
    appendQueryParams(baseUrl, params) {
        const url = new URL(baseUrl);
        for (const [key, value] of Object.entries(params)) {
            url.searchParams.set(key, value);
        }
        return url.href;
    },

    /**
     * Dynamically set the `src` of an iframe with query parameters.
     * @param {HTMLIFrameElement} iframeElement - The iframe element.
     * @param {string} baseIframeUrl - The base URL for the iframe.
     */
    setIframeSrcWithQuery(iframeElement, baseIframeUrl) {
        if (!(iframeElement instanceof HTMLIFrameElement)) {
            throw new Error('Provided element is not a valid iframe');
        }
        const queryParams = this.getAllQueryParams();
        iframeElement.src = this.appendQueryParams(baseIframeUrl, queryParams);
    },

    /**
     * Redirect the current page to a new URL with appended query parameters.
     * @param {string} baseUrl - The target URL for redirection.
     */
    redirectToUrlWithQuery(baseUrl) {
        const queryParams = this.getAllQueryParams();
        const newUrl = this.appendQueryParams(baseUrl, queryParams);
        window.location.href = newUrl;
    },

    /**
     * Generate a dynamic link with query parameters and attach it to an anchor element.
     * @param {string} baseUrl - The base URL for the link.
     * @param {HTMLAnchorElement} anchorElement - The anchor element to set the link.
     */
    generateLinkWithQuery(baseUrl, anchorElement) {
        if (!(anchorElement instanceof HTMLAnchorElement)) {
            throw new Error('Provided element is not a valid anchor element');
        }
        const queryParams = this.getAllQueryParams();
        anchorElement.href = this.appendQueryParams(baseUrl, queryParams);
    }
};

// Export the library for modular usage (optional for GitHub users)
// export default QueryHandler;
