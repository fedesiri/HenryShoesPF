const { ShoppingCart, Orders } = require("../db.js");

const getShoppingCart = async (req, res) => {
const username = req.body.username
console.log(username, "esto es username")
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
    //console.log("hasjhdjasd")
    res.status(200).send(selectedCart);
}catch(err){
    console.log(err)
    res.send("ooorrrorrrr")
} 
};

module.exports ={
    getShoppingCart
};