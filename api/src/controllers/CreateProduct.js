const { Products, Brands, Category } = require("../db.js");
const { Op } = require("sequelize");

async function createProduct(req, res) {
  try {
    let { model, description, price, image, gender, brandName, year, CategName } =
      req.body;

    let productCreate = await Products.create({
      model: model,
      description: description,
      price: price,
      image: image,
      gender: gender,
      year: year,
    });
    let brandsDB = await Brands.findOne({
      where: { name: brandName }
    });
    let categDB = await Category.findOne({
      where: { name: CategName },
    });
    console.log(categDB);
    const [categ, created ] = await Category.findOrCreate({
      where: { name: CategName },
      });
      console.log(categ.name);
      console.log(created);

    productCreate.setBrand(brandsDB);
    productCreate.setCategory(categDB,categ);
    res.status(200).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const modifProduct = (req, res) => {
  let { model, description, price, image, gender, brandName, year, CategName } = req.body;
  let id = req.params.id;
  let product = Products.findByPk(id);
  let brands = Brands.findOne({
    where: { name: brandName },
  });
  
  let categ = Category.findOrCreate({
    where: { name: CategName },
    });

  Promise.all([product, brands, categ])
    .then(function (values) {
      let prod = values[0];
      let bra = values[1];
      let cat = values[2].values[0];
  
      Products.update(
        {
          model: model,
          description: description,
          price: price,
          image: image,
          gender: gender,
          year: year,
          CategName: CategName
        },
        {
          where: {
            id: id,
          },
        }
      );
      prod.setBrand(bra).then(function (brands) {
        res.status(200)
      });
      prod.setCategory(cat).then(function (categ){
        res.status(200).json({ message: "Producto modificado exitosamente" });
      })
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

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
        return res.send({ message: "Producto no encontrado!" }).status(400); // Show proper error in DevTool to the FrontEnd guys.
      }
      return res.send("Product Deleted");
    })
    .catch((err) => {
      return res.send({ message: err }).status(400); // Show proper error in DevTool to the FrontEnd guys.
    });
};

module.exports = {
  createProduct,
  modifProduct,
  deleteProduct,
};
