import Reviews from "../models/Reviews.js";
import Products from "../models/Products.js";
import User from "../models/User.js";

export const addReview = async function (req, res) {

    try {
        const { rating, commentary, productId, email } = req.body;
        console.log(req.body)
        if (rating === 1 || rating === 2 || rating === 3 || rating === 4 || rating === 5) {

            let reviewCreate = await Reviews.findOrCreate({
                where: {
                    rating,
                    commentary,
                    productId,
                    email,
                }
            });

            res.status(200).json({ message: "Review created successfully." });
        } else {
            res.send("The rating value is incorrect")
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
};

export const getReviews = async (req, res) => {
    const { email } = req.params;
    try {
        const myReviews = await Reviews.findAll({
            where: {
                email: email
            }
        })
        await myReviews
        res.send(myReviews)
    } catch (error) {
        console.log(error)
        res.send(error)
    };
};

export const getSpecificReview = async (req, res) => {
    const { productId, email } = req.params;
    console.log("llegue", req.params)
    try {
        const myReviews = await Reviews.findOne({
            where: {
                email: email,
                productId: Number(productId)
            }
        })
        await myReviews
        res.send(myReviews)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export const getAllReviews = async (req, res) => {
    try {

        const allReviews = await Reviews.findAll({
            include: {
                model: Products,
                attributes: ["model", "id"]
            },
        });

        await allReviews
        console.log(allReviews, "Las reviews llegan")
        res.send(allReviews)
    } catch (error) {
        console.log(error, "Este es el errorrr")
        res.send(error)
    }
};

export const AllReviews = async (req, res) => {
    try {
        const allReviews = await Reviews.findAll({});
        console.log("AAAJAJJAJA")
        await allReviews;
        await res.send(allReviews)
    } catch (error) {
        console.log(error)
    }

}

export const deleteReiew = async (req, res) => {
    const { idReview } = req.params;
    try {
        await Reviews.destroy({
            where: {
                id: idReview
            }
        });
        res.status(200).send("The review was deleted")
    } catch (err) {
        console.log(err)
        res.send(err)
    }
};

export const modifyReview = async (req, res) => {
    const { rating, commentary, id } = req.body
    let ratingg = Number(rating)
    console.log("modification", req.body)
    try {
        if (commentary && ratingg) {
            await Reviews.update({
                commentary: commentary,
                rating: ratingg,
            },
                {
                    where: { id: id }
                })
            // res.send("The review was succesfully modificated")
        }
        res.send("Please enter the new data");
    } catch (err) {
        console.log(err);
        res.send(err)
    }

}


export const getReviewsId_Products = async (req, res) => {
    const { productId } = req.body;
    console.log("holaa", productId)
    try {

        const myReviews = await Reviews.findAll({
            where: {
                productId: productId
            },
            include: {
                model: Products,
                attributes: ["model", "id"]
            },
        })
        await myReviews
        res.send(myReviews)
    } catch (error) {
        console.log(error)
        res.send(error)
    };
};

// let id = req.params.id;
// try {
//   const Models_Id = await Products.findByPk(id, {
//     include: [{
//       model: Sizes,
//       attributes: ["size"]},
//       {model: Reviews,
//       attributes: ["commentary", "rating", "email"]
//     }],
//   });

//   if (Models_Id !== null) {
//     res.status(200).json(Models_Id);
//   } else {
//     res.status(404).send({ message: "Product not found." });
//   }
// } catch (err) {
//   res.status(500).send({ message: err.message });
// }