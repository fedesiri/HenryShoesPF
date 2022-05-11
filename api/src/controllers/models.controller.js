const { Models, Brands, Colors, Stocks, Sizes } = require("../db.js");
const { Op } = require("sequelize");

const getAllModels = async (req, res) => {
  try {
    const allModels = await Models.findAll();

    if (req.query.model) {
      let shoes = await Models.findAll({
        where: {
          model: {
            [Op.iLike]: `%${req.query.model}%`
          }
        }
      })
      if (shoes.length === 0) {
        return res.status(404).send({ message: "No shoes found" });
      } else {
        res.status(200).send(shoes);
      }
    } else {
      res.status(200).send(allModels);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


const getAllModelsByBrand = async (req, res) => {
  let { id } = req.params;
  id.toLowerCase();
  try {
    const brand = await Models.findAll({
      where: {
        brandId: {
          [Op.iLike]: `%${id}%`,
        },
      },
    });
    if (brand.length !== 0) {
      res.status(200).send(brand);
    } else {
      res.status(404).send({ message: "No brand found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

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




const getDetails = async (req, res) => {
  let id = req.params.id
  try {
    const Models_Id = await Models.findByPk(id)
    if (Models_Id !== null) {
      res.status(200).json(Models_Id)
    } else {
      res.status(404).send({ message: "Models not found" })
    }

  } catch (err) {
    console.log(err, "error en busqueda por id")
    res.send({ message: "fallo" });
  }
};











module.exports = {
  getAllModels,
  getAllModelsByBrand,
  getAllBrands,
  getDetails
};
