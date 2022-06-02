import products_sizes from "../models/products_sizes.js";
import Orders from "../models/Orders.js";
import ShoppingCart from "../models/ShoppingCart.js";

export const getStock = async (req, res) => {
  const productId = req.body.productId;
  const sizeId = req.body.sizeId;
  try {
    if (sizeId) {
      for(let i = 0; i < sizeId.length; i++){
      const order = await Orders.findOrCreate({
        where: {
          sizeId: sizeId[i].size,
          productId: productId,
        },
        include: {
          model: ShoppingCart,
          attribute: ["email"],
        },
      });
    };
    const stock = await Orders.findAll({
      where: {
        productId: productId
      }
    })
      await stock ? res.send(stock) : res.send(5);
    } else {
      const stock = await Orders.findAll({
        where: {
          productId: productId,
        },
      });
      stock.length > 0 ? res.send(stock) : res.send(5);
    }
  } catch (err) {
    res.send(err.message);
  }
};

export const getProductStock = async (req, res) => {

  const productId = req.params  
  try {
    const allSizes = await products_sizes.findAll({
      where:{
        productId: productId.productId
      }
    });
    
    for (let i = 0; i < await allSizes.length; i++){
      const newStock = await Orders.findOrCreate({
        where:{
          productId: productId.productId,
          sizeId: allSizes[i].sizeId
        }
      });
    };
    
    const allStock = await Orders.findAll({
      where:{
        productId: productId.productId
      }
    })
    res.send( await allStock)
  } catch (error) {
    console.error(error)
  }
  
  };


export const HandleStock = async (req,res) => {
  const {productId, sizeId, stock} = req.body;
  try{
    const selctedOrder = await Orders.findOne({
      where: {
        sizeId: sizeId,
        productId: productId,
      },
      include: {
        model: ShoppingCart,
        attribute: ["email"],
      },
    });
    
    const updatedStock = await Orders.update(
      {
        stock: stock
      },
      {
        where: {
          productId: productId,
          sizeId: sizeId,
        },
      }
    );
  res.send({message: "The stock is up to date"})
  }catch(err){res.send(err)}
  
  };

export const createOrder = async (req, res) => {
  const { data, email } = req.body;
  const ordenes = data;
  console.log(req.body);

  try {
    const selectedCart = await ShoppingCart.findOne({
      where: {
        email: email,
        statusOpen: true
      },
      include: {
        model: Orders,
      },
    });

    for (let i = 0; i < ordenes.length; i++) {
      const pruebas = await products_sizes.findOne({
        where: {
          productId: ordenes[i].id,
          sizeId: ordenes[i].sizes,
        },
      });
      if (await pruebas) {
        let thisOrder = await Orders.findOrCreate({
          where: {
            productId: ordenes[i].id,
            sizeId: ordenes[i].sizes,
          },
        });
        let thisStock = thisOrder[0].dataValues.stock;
        if (ordenes[i].quantity <= thisOrder[0].dataValues.stock) {
          const newOrder = await Orders.update(
            {
              quantity: ordenes[i].quantity,
              // stock: thisStock - data[i].quantity,
            },
            {
              where: {
                productId: ordenes[i].id,
                sizeId: ordenes[i].sizes,
              },
            }
          );

          const selectedOrder = await Orders.findOne({
            where: {
              productId: ordenes[i].id,
              sizeId: ordenes[i].sizes,
            },
          });

          await selectedCart.addOrders(selectedOrder);
        } else {
          res.send({ thisOrder, message: "Stock is not enough." });
        }
      } else res.send({ message: "Product doesn't match with size." });
    }

    res
      .status(200)
      .send({ selectedCart, message: "Product has been added to cart." });
  } catch (err) {
    console.log(err);
  }
};

export const getOrder = async (req, res) => {
  const { productId, sizeId } = req.body;
  try {
    const selctedProduct = await Orders.findOne({
      where: {
        productId: productId,
        sizeId: sizeId,
      },
      include: {
        model: ShoppingCart,
        attribute: ["email"],
      },
    });
    res.status(200).send(selctedProduct);
  } catch (err) {
    res.send(err);
  }
};
