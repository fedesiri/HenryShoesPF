require("dotenv").config();
const fs = require("fs");
const { Products, Brands, User, Role } = require("../db");

const jsonRead = JSON.parse(
  fs.readFileSync(`${__dirname}/AdidasChild0.json`, "utf-8")
);


async function seeder() {

  const shoes = jsonRead.result;
  try {
    shoes.map(async (shoe) => {
      const product = await Products.create({
        model: shoe.name ? shoe.name : "generic",
        description: shoe.story
          ? shoe.story
          : "The footwear that everyone wants to have",
        image: shoe.image.original
          ? shoe.image.original
          : "https://image.goat.com/attachments/product_template_pictures/images/070/791/134/original/GZ4000.png.png",
        price: shoe.estimatedMarketValue ? shoe.estimatedMarketValue : 100,
        gender: shoe.gender ? shoe.gender : "unisex",
        year: shoe.releaseYear,
      });
      const brandProduct = await Brands.findOne({
        where: {
          name: shoe.brand,
        },
      });
      brandProduct.addProduct(product);
    });
  } catch (error) {
    console.error(error);
  }
}

async function seedBrand() {
  const shoes = jsonRead.result;
  try {
    const brandFull = await Brands.findAll();
    if (brandFull.length > 0) {
      console.log("brands ya tiene datos");
    } else {
      shoes.map((brand) => {
        Brands.findOrCreate({     
          where: {
            name: brand.brand,
          },
        });
      });
      return "Brands are Loaded";
    }
  } catch (error) {
    console.error(error);
  }
}

const roles = ["admin", "user"];
const createRoles = async () => {
  try {
    const rolesDb = await Role.findAll();
    if (rolesDb.length > 0) {
      console.log("roles already loaded");
    } else {
      roles.map(async (role) => {
        await Role.create({
          name: role,
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { seeder, seedBrand, createRoles };
