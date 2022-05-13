const { Products, Brands } = require("../db.js");
const { Op } = require("sequelize");


const createProduct = async (req, res) => {
    try {
        let {
            model, 
            description,
            price,
            image,
            gender,
            brand
        } = req.body;

        let productCreate = await Products.create ({
            model: model,
            description: description,
            price: price,
            image: image,
            gender: gender,
        });
        let brandsDB = await Brands.findOne({
            where :{ name: brand }
        });
        productCreate.setBrand(brandsDB)
        res.status(200).json(productCreate)
        res.send ('Producto creado con éxito');
    }catch (error){
        console.log(error)
    }
}

module.exports = {
    createProduct
  };
  