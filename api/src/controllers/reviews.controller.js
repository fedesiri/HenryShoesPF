import Reviews from "../models/Reviews";
import Products from "../models/Products";
import User from "../models/User";

export const addReview = async function (req, res) {
    
    try {
        const { rating, commentary, productId, userId } = req.body;
        
            let reviewCreate = await Reviews.findOrCreate({
                rating,
                commentary,
                productId,
                userId,
            });
            console.log(reviewCreate)
        res.status(200).json({ message: "Review created successfully." });     
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
};