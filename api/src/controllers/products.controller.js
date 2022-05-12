const { Products, Brands, Colors, Stocks, Sizes } = require("../db.js");
const { Op } = require("sequelize");

const getAllModels = async (req, res) => {
    try {
        const allModels = await Products.findAll();

        if (req.query.model) {
            let shoes = await Products.findAll({
                where: {
                    model: {
                        [Op.iLike]: `%${req.query.model}%`,
                    },
                },
            });
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
        const brand = await Products.findAll({
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
};

const getAllBrands = (req, res) => {
    Products.findAll({
        attributes: ["brandId"],
    })
        .then(brands => {
            if (brands.length === 0) {
                res.status(404).send({ message: "No brands found" });
            } else {
                const brandSet = Array.from(new Set(brands.map(brand => brand.brandId)));
                res.status(200).send(brandSet);
            }
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
};


async function GetShoesByGender (req,res){
    
  const gender = req.params.gender

  try{
  
  const ShoesByGender = await Products.findAll({
        
    where:{
         gender: gender
          }
    });
    res.send(ShoesByGender)
    }catch(error)
    {
      res.status(500).send({message: error.message})
    }
};



module.exports = {
    GetShoesByGender,
    getAllModels,
    getAllModelsByBrand,
    getAllBrands,
};
