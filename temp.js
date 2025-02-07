const fetchRedditComments = async () => {
    const url = "https://www.reddit.com/r/mildlyinteresting/comments/1hhmcc0/my_hair_stands_up_like_this_without_any_product/.json";
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // The comments are in the second element of the response array
        const comments = data[1].data.children.map(comment => comment.data.body);
        
        console.log("Comments:", comments);
    } catch (error) {
        console.error("Error fetching Reddit comments:", error);
    }
};

fetchRedditComments();
