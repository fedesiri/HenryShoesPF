const { Products, Brands } = require("../db.js");
const { Op } = require("sequelize");

const createProduct = async (req, res) => {
  try {
    let { model, description, price, image, gender, brand, year } = req.body;

    let productCreate = await Products.create({
      model: model,
      description: description,
      price: price,
      image: image,
      gender: gender,
      year: year
    });
    let brandsDB = await Brands.findOne({
      where: { name: brand },
    });
    productCreate.setBrand(brandsDB);
    // res.status(200).json(productCreate); Comento porque daba error cannot set headers after
    res.send({message: "Producto creado con éxito"}); 
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
};
