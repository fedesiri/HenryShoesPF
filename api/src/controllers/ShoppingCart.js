const { ShoppingCart, Orders } = require("../db.js");

const getShoppingCart = async (req, res) => {
const username = req.body.username

try{
    const selectedCart = await ShoppingCart.findAll({
        where:{
            username: username
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