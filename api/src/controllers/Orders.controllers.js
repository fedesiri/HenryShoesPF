const { Products, Sizes, products_sizes, Orders } = require("../db.js");


const createOrder = async (req, res) => {
const {productId, sizeId, quantity} = req.body
console.log(productId, sizeId, quantity)
try{
    const pruebas = await products_sizes.findOne({
        where: {
            productId: productId,
            sizeId: sizeId
        }
    });
    if( await pruebas){
         await Orders.findOrCreate({
            where:{
                productId: productId,
                sizeId: sizeId,
            },
        });
        const newOrder = await Orders.update({
            quantity: quantity,
        },
        {
         where:{
            productId: productId,
            sizeId: sizeId,
         }   
        });
        res.status(200).send("El producto se ha agregado al carrito");
    }else
     res.send("El producto no coincide con el talle")
}catch(err){console.log(err)}
};

const getOrder = async (req,res) => {
const {productId, sizeId} = req.body
try{
const selctedProduct = await Orders.findOne({
    where:{
        productId: productId,
        sizeId: sizeId
    }
})
res.status(200).send(selctedProduct)
}catch(err){
    res.send(err)
}
};


module.exports ={
    createOrder,
    getOrder
};