import Brands from "../models/Brands.js";
import Products from "../models/Products.js";
import Role from "../models/Role.js";
import Sizes from "../models/Sizes.js";
import productsJson from "./AdidasChild0.js";


export async function seedBrand() {
  const shoes = productsJson.result;
  try {
    const brandsFull = await Brands.findAll();
    if (brandsFull.length === 0) {
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
        console.log("brands are loaded");
      }
    } else {
      console.log("brands already loaded");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function seedSize() {
  let array = [
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43, 44, 45,
  ];
  try {
    const sizesFull = await Sizes.findAll();
    if (sizesFull.length === 0) {
      array.map((size) => {
        Sizes.findOrCreate({
          where: {
            size: size,
            id: size,
          },
        });
      });
      console.log("sizes are loaded");
    } else {
      console.log("sizes already loaded");
    }
  } catch (err) {
    console.error(err);
  }
}

const roles = ["admin", "user"];
export const createRoles = async () => {
  try {
    const rolesFull = await Role.findAll();
    if (rolesFull.length === 0) {
      roles.map(async (role) => {
        await Role.create({
          name: role,
        });
      });
      console.log("roles are loaded");
    } else {
      console.log("roles already loaded");
    }
  } catch (error) {
    console.error(error);
  }
};

export async function seeder() {
  const shoes = productsJson.result;
  const productsFull = await Products.findAll();
  try {
    if (productsFull.length === 0) {
      shoes.map(async (shoe) => {
        const product = await Products.create({
          model: shoe.name ? shoe.name : "generic",
          description: shoe.story
            ? shoe.story
            : "The footwear that everyone wants to have",
          image: shoe.image.original ? shoe.image.original : "",
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

        if (shoe.gender == "infant") {
          for (let i = 18; i < 26; i++) {
            const newSize = await Sizes.findOne({
              where: {
                size: i,
              },
            });
            product.addSizes(newSize);
          }
        } else if (shoe.gender == "child") {
          for (let i = 27; i < 34; i++) {
            const newSize = await Sizes.findOne({
              where: {
                size: i,
              },
            });
            product.addSizes(newSize);
          }
        } else {
          for (let i = 35; i < 45; i++) {
            const newSize = await Sizes.findOne({
              where: {
                size: i,
              },
            });
            product.addSizes(newSize);
          }
        }
      });
      console.log("products are loaded");
    } else {
      console.log("products already loaded");
    }
  } catch (error) {
    console.log(error);
  }
}
