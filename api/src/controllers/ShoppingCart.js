const { ShoppingCart, Orders } = require("../db.js");

const getShoppingCart = async (req, res) => {
const email = req.body.email

try{
    const selectedCart = await ShoppingCart.findAll({
        where:{
            email: email
        },
        include:{
            model: Orders,
            attributes: ["sizeId","productId","quantity"]
        }   
    });
   
    res.status(200).send(selectedCart);
}catch(err){
    console.log(err)
    res.send(err.message)
} 
};

module.exports ={
    getShoppingCart
};