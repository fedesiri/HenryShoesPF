require("dotenv").config();
const fs = require("fs");
const { Products, Brands, User, Role, Sizes } = require("../db");

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
  
    if(shoe.gender == "infant"){
      for(let i = 18; i < 26; i++){
      const newSize = await Sizes.findOne({
            where:{
              size: i
            }
          });
      product.addSizes(newSize)
          };
        }else if(shoe.gender == "child"){
          for(let i = 27; i < 34; i++){
            const newSize = await Sizes.findOne({
                  where:{
                    size: i
                  }
                });
            product.addSizes(newSize)
                };
        }else{
          for(let i = 35; i < 45; i++){
            const newSize = await Sizes.findOne({
                  where:{
                    size: i
                  }
                });
            product.addSizes(newSize)
                };
         };
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

async function seedSize(){
  let array=[18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]; 
  try{
    const sizeFull = await Sizes.findAll();
    if(sizeFull.length > 0){
      console.log("Sizes ya tiene datos")
    }else{
      array.map((size) => {Sizes.findOrCreate({
        where:{
          size: size 
        }
      });
    });
    return "Sizes are loaded";
    }
  }catch(err){console.error(err)}
};

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

module.exports = { seeder, seedBrand, seedSize, createRoles };
