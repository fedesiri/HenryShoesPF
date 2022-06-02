import { Op } from "sequelize";
import Brands from "../models/Brands.js";
import Category from "../models/Category.js";
import Orders from "../models/Orders.js";
import Products from "../models/Products.js";
import Reviews from "../models/Reviews.js";
import Sizes from "../models/Sizes.js";

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.findAll({
      include: [{
        model: Brands,
        attributes: ["name"]},
        {model: Sizes,
        attributes: ["size"],
      }],
    });

    const { name } = req.query;
    const productsName = await Products.findAll({
      where: {
        model: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Brands,
        attributes: ["name"],
        model: Sizes,
        attributes: ["size"],
      },
    });

    if (name) {
      if (productsName.length === 0) {
        res.status(404).send({ message: "There are no products." });
      } else {
        res.send(productsName);
      }
    } else {
      res.send(allProducts);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const GetShoesByGender = async (req, res) => {
  const gender = req.params.gender;
  try {
    const ShoesByGender = await Products.findAll({
      where: {
        gender: gender,
      },
    });
    res.send(ShoesByGender);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getDetails = async (req, res) => {
  let id = req.params.id;
  try {
    const Models_Id = await Products.findByPk(id, {
      include: [
        {
        model: Sizes,
        attributes: ["size", "id"],
      },
        {
          model: Reviews,
        attributes: ["commentary", "rating", "email"]
      }],

    });

    if (Models_Id !== null) {
      res.status(200).json(Models_Id);
    } else {
      res.status(404).send({ message: "Product not found." });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getAllSizes= async (req, res) => {
  try {
    const allSizes = await Sizes.findAll();
    if (allSizes.length === 0) {
      res.status(404).send({ message: "There are no Sizes." });
    } else {
      res.status(200).send(allSizes);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export async function createProduct(req, res) {
  try {
    let {
      model,
      description,
      price,
      image,
      gender,
      brandName,
      year,
      CategName,
      size,
      stock
    } = req.body;

    let productCreate = await Products.create({
      model: model,
      description: description,
      price: price,
      image: image,
      gender: gender,
      year: year,
    });

    var brandNameToUpper =
      brandName.charAt(0).toUpperCase() + brandName.slice(1).toLowerCase();

    let [newBrand, id] = await Brands.findOrCreate({
      where: { name: brandNameToUpper },
    });

    const [categ, created] = await Category.findOrCreate({
      where: { name: CategName },
    });

    const [sizes, createdSize] = await Sizes.findOrCreate({
      where:{
        size: size
      }
    })

    productCreate.setBrand(newBrand.name);
    productCreate.setCategory(categ.name);
    await productCreate.addSizes(sizes)
    
    await Orders.findOrCreate({
        where:{
          productId: productCreate.id,
          sizeId: size,
          // stock: stock
        }
      });
      console.log(productCreate)
    res.status(200).json({ message: "Product created successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export const modifProduct = (req, res) => {
  let { model, description, price, image, gender, brandName, year, CategName } =
    req.body;

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
          brandName: brandName,
          price: price,
          image: image,
          gender: gender,
          year: year,
          CategName: CategName,
        },
        {
          where: {
            id: id,
          },
        }
      );
      prod.setBrand(bra).then(function (brands) {
        res.status(200);
      });
      prod.setCategory(cat).then(function (categ) {
        res.status(200).json({ message: "Product updated successfully." });
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

export const deleteProduct = (req, res) => {
  const id = req.params.id;
  Products.destroy({
    where: {
      id: id,
    },
  })
    .then((confirmation) => {
      if (confirmation === 0) {
        // checking if the id passed its correct
        return res.send({ message: "Product not found." }).status(400); // Show proper error in DevTool to the FrontEnd guys.
      }
      return res.send("Product deleted successfully");
    })
    .catch((err) => {
      return res.send({ message: err }).status(400); // Show proper error in DevTool to the FrontEnd guys.
    });
};

export const ofertSelect = (req, res, next) => {
  let { id_oferta, id_destacado, porcentaje } = req.body;
  console.log(req.body);

  var array = id_oferta;
  try {
    try {
      if (array.length !== 0 && porcentaje.length === 0) {
        res.status(500).send("falta porcentaje");
      }
    } catch (err) {
      console.log(err);
    }

    try {
      if (array.length !== 0 && porcentaje.length !== 0) {
        var Promises = [];
        array.forEach((e) => {
          var newPromise = Products.update(
            {
              inOferta: true,
              porcentaje: porcentaje,
            },
            { where: { id: Number(e) } }
          );
          Promises.push(newPromise);
        });
        Promise.all(Promises).then((result) => {
          result.forEach((r) => console.log(r));
        });
      }
    } catch (err) {
      console.log("Error adding ofert", err);
    }

    try {
      var arrayDestacado = id_destacado;

      if (arrayDestacado.length !== 0) {
        var Promises = [];
        arrayDestacado.forEach((e) => {
          var newPromise = Products.update(
            { inDestacados: true },
            { where: { id: Number(e) } }
          );
          Promises.push(newPromise);
        });
        Promise.all(Promises).then((result) => {
          result.forEach((r) => console.log(r));
        });
      }
    } catch (err) {
      console.log("Error adding 'Best sellers'.", err);
    }
    res.status(200).send({ message: "Information has been updated." });
  } catch (err) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteDestacado = async (req, res) => {
  let { id } = req.body;
  try {
    const ResultUpDate = await Products.update(
      {
        inDestacados: false,
      },
      { where: { id: id } }
    );

    res.status(200).send("Product removed from 'Best Sellers'");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deletePromotion = async (req, res) => {
  let { id } = req.body;
  try {
    const ResultUpDate = await Products.update(
      {
        inOferta: false,
        porcentaje: null,
      },
      { where: { id: id } }
    );
    res.status(200).send("Product removed from 'Promotions'");
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: error.message });
  }
};

export const deleteManyProducts = async (req, res) => {
  console.log(req.body, "ids products");
  try {
    const deleteMany = await Products.destroy({
      where: {
        id: {
          [Op.in]: req.body.ids,
        },
      },
    });
    if (deleteMany) {
      res.status(200).send({ message: "Products deleted successfully" });
    } else {
      res.status(500).send({ message: "Error deleting products" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

