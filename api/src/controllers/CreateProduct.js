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


const modifProduct = (req, res) => {
  let { model, description, price, image, gender, brandName, year } = req.body;
  let id = req.params.id;
  let product = Products.findByPk (id);
  let brands = Brands.findOne({
    where: { name: brandName }
  })
  Promise.all ([product,brands])
  .then(function(values){
    let prod = values[0];
    let bra = values [1];
    Products.update({
      model: model,
      description: description,
      price: price,
      image: image,
      gender: gender,
      year: year
    },
    {
      where:{
        id: id
      },
    })
    prod.setBrand(bra)
    .then(function(brands){
      res.status(200).json(brands)
    })
  })
}

// const deleteProduct = function(req, res, next){
//   const { id } = req.body 
//   let product = Products.findByPk(req.params.id);
//   let brands = Brands.findByPk(id);
//   Promise.all([product, brands])
//   .then(function(values){
//       let prod = values[0];
//       let bra = values[1];
//       prod.removeBrands(bra)
//   .then(function(removeBrands){
//       res.status(200).json(removeBrands)
//   }).catch(function(reason){
//       res.status(400).json({message:"CATEGORY COULDN'T BE REMOVED", data: reason})
//   });
//   });
// }

const deleteProduct = (req, res) => {
  const id = req.params.id;
  Products.destroy({
    where: {
      id: id,
    },
  })
    .then((confirmation) => {
      if (confirmation === 0) {
        // checking if the id passed its correct
        return res.send({ data: "Product not found!" }).status(400); // Show proper error in DevTool to the FrontEnd guys.
      }
      return res.send("Product Deleted");
    })
    .catch((err) => {
      return res.send({ data: err }).status(400); // Show proper error in DevTool to the FrontEnd guys.
    });
};

module.exports = {
  createProduct,
  modifProduct,
  deleteProduct
};
