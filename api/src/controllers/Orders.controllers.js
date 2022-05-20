const { Products, Sizes, products_sizes, Orders, ShoppingCart } = require("../db.js");

const getStock = async(req,res) => {
const productId = req.body.productId;
const sizeId = req.body.sizeId;
try{
    if(sizeId){
    const stock = await Orders.findOne({
        where:{
            sizeId: sizeId,
            productId: productId
        }
    })
    stock?res.send(stock):res.send("el stock por default es 5");
    }else{
    const stock = await Orders.findAll({
        where:{
            productId: productId
        }
    })
    stock.length>0?res.send(stock):res.send("el stock por default es 5");
    }
}catch(err){
    res.send(console.log(err))
}

}


const createOrder = async (req, res) => {
const {data, username} = req.body;
const ordenes = data
const CreatedOrders = [];

try{

const selectedCart = await ShoppingCart.findOne({
    where:{
        username: username
    },
    include:{
        model: Orders
    }
});

for(let i= 0; i <ordenes.length; i++){        
    const pruebas = await products_sizes.findOne({
    where: {
        productId: ordenes[i].productId,
        sizeId: ordenes[i].sizeId
    }
});
if( await pruebas){
    let thisOrder = await Orders.findOrCreate({
        where:{
            productId: ordenes[i].productId,
            sizeId: ordenes[i].sizeId,
        },

    });
    if(ordenes[i].quantity <= thisOrder[0].dataValues.stock){
    const newOrder = await Orders.update({
        quantity: ordenes[i].quantity,
    },
    {
     where:{
        productId: ordenes[i].productId,
        sizeId: ordenes[i].sizeId,
     }   
    });

    //console.log(selectedCart, "esto es elselected")
    await selectedCart.addOrders(newOrder)

    //console.log(selectedCart.Orders)
}else{
    res.send("La cantidad seleccionada es mayor que el stock disponible");
}
}else
 res.send("El producto no coincide con el talle")}

res.status(200).send({selectedCart, message:"El producto se ha agregado al carrito"}) 
}catch(err){console.log(err)}
    };

const getOrder = async (req,res) => {
const {productId, sizeId} = req.body
try{
const selctedProduct = await Orders.findOne({
    where:{
        productId: productId,
        sizeId: sizeId
    },
    include:{
        model: ShoppingCart,
        attribute: ["username"]
    }
})
res.status(200).send(selctedProduct)
}catch(err){
    res.send(err)
}
};


module.exports ={
    createOrder,
    getOrder,
    getStock
};