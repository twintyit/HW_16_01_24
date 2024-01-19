class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}/${endpoint}`);

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async fetchProductById(productId) {
        try {
            const response = await fetch(`${this.baseURL}/products/${productId}`);

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error(`Error fetching product with id ${productId}:`, error);
            throw error;
        }
    }
}

export default ApiClient;