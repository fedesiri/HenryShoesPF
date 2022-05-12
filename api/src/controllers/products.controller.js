const { Products, Brands } = require("../db.js");
const { Op } = require("sequelize");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.findAll({
      include: Brands,
    });

    if (req.query.brand) {
      let shoes = await Brands.findAll({
        include: Products,
        where: {
          name: {
            [Op.iLike]: `%${req.query.brand}%`,
          },
        },
      });
      if (shoes.length === 0) {
        return res.status(404).send({ message: "No shoes found" });
      } else {
        res.status(200).send(shoes);
      }
    } else {
      res.status(200).send(allProducts);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


const getAllBrands = async (req, res) => {
  try {
    const allBrands = await Brands.findAll();
    if (allBrands.length === 0) {
      res.status(404).send({ message: "No brands found" });
    } else {
      res.status(200).send(allBrands);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};



async function GetShoesByGender(req, res) {
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
}



module.exports = {
  getAllProducts,
  getAllBrands,
  GetShoesByGender,
};
