import { Op } from "sequelize";
import Brands from "../models/Brands.js";

export const getAllBrands = async (req, res) => {
  try {
    const allBrands = await Brands.findAll();
    if (allBrands.length === 0) {
      res.status(404).send({ message: "There are no brands." });
    } else {
      res.status(200).send(allBrands);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const createBrand = async (req, res) => {
  const { name } = req.body; 
  var brandToUpper = name?.charAt(0).toUpperCase() + name?.slice(1);


  try {
    const newBrand = await Brands.findOrCreate({
      where: {
        name: brandToUpper,
      },
    });
    if (newBrand) {
      res.status(200).send({ message: "Brand created successfully." });
    } else {
      res.status(404).send({ message: "Brand not created." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  var brandToUpper = name.charAt(0).toUpperCase() + name.slice(1);

  try {
    const updateBrand = await Brands.findOne({
      where: {
        id: id,
      },
    });
    if (updateBrand) {
      await updateBrand.update({
        name: brandToUpper,
      });
      res.status(200).send({ message: "Brand updated successfully." });
    } else {
      res.status(404).send({ message: "Brand not updated." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteBrand = await Brands.findOne({
      where: {
        id: id,
      },
    });
    if (deleteBrand) {
      await deleteBrand.destroy();
      res.status(200).send({ message: "Brand deleted successfully." });
    } else {
      res.status(404).send({ message: "Brand not deleted." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteManyBrands = async (req, res) => {
  const { ids } = req.body;
  console.log(req.body, "ids");
  try {
    const deleteManyBrands = await Brands.destroy({
      where: {
        id: {
          [Op.in]: req.body.ids,
        },
      },
    });
    if (deleteManyBrands) {
      res.status(200).send({ message: "Brands deleted successfully." });
    } else {
      res.status(404).send({ message: "Brands not deleted." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
