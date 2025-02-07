const fetchAmazonReviews = async () => {
    const apiKey = "9218862fc4cbca29871ad0e8a179921580ca17c7b6517714320a19373d9ae337";
    const productId = "B0CP9YB3Q4";
    const url = `https://serpapi.com/search.json?engine=amazon_reviews&product_id=${productId}&api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const responseBody = await response.text(); // Capture full response

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${responseBody}`);
        }

        const data = JSON.parse(responseBody);
        console.log("Full API Response:", data); // Debugging

        if (!data.reviews) {
            throw new Error("No reviews found. Check your API key and ASIN.");
        }

        const reviews = data.reviews.map(review => ({
            title: review.title,
            rating: review.rating,
            body: review.body
        }));

        console.log("Amazon Reviews:", reviews);
    } catch (error) {
        console.error("Error fetching Amazon reviews:", error);
    }
};

fetchAmazonReviews();
