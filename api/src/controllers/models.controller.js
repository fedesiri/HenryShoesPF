const { Models, Brands, Colors, Stocks, Sizes } = require("../db.js");
const { Op } = require("sequelize");

const getAllModels = async (req, res) => {
  try {
    const allModels = await Models.findAll();
   
    if(req.query.model) {
      let shoes = await Models.findAll({
        where: {
          model: {
            [Op.iLike]: `%${req.query.model}%`
          }
        }
      })
      if(shoes.length === 0) {
        return res.status(404).send({message: "No shoes found"});
      } else{
        res.status(200).send(shoes);
      }
    }else{
      res.status(200).send(allModels);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllBrands = (req, res) => {
  Models.findAll({
    attributes: ["brandId"],
  })
    .then((brands) => {
      if (brands.length === 0) {
        res.status(404).send({ message: "No brands found" });
      } else {
        const brandSet = Array.from(
          new Set(brands.map((brand) => brand.brandId))
        );
        res.status(200).send(brandSet);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

module.exports = {
  getAllModels,
  getAllBrands
};
