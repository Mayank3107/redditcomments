const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
    const postUrl = req.query.postUrl;

    if (!postUrl) {
        return res.status(400).json({ error: "Post URL is required as a query parameter" });
    }

    try {
        // Convert Reddit post URL to JSON format
        const jsonUrl = postUrl.endsWith(".json") ? postUrl : `${postUrl}.json`;

        const response = await axios.get(jsonUrl, {
            headers: {
                "User-Agent": "MyRedditAPI/1.0 (by YourUsername)"
            }
        });

        const data = response.data;

        // Extract comments
        const comments = data[1]?.data?.children
            .filter(comment => comment.kind === "t1") // Only take actual comments
            .map(comment => comment.data.body);

        res.json({ comments });
    } catch (error) {
        console.error("Error fetching Reddit comments:", error.message);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
