require("dotenv").config();
const fs = require("fs");
const { Products, Brands, Sizes } = require("../db");



const jsonRead = JSON.parse(
    fs.readFileSync(`${__dirname}/AllShoes.json`, "utf-8")
  );

// let parsedJson = require('../AllShoes.json');
// let result = parsedJson.result;


//console.log("probandoooooo")

// async function seeder(){
//     const shoes = jsonRead.result;
//     console.log(shoes[0], "esto es shoes")
//     //console.log('funcion seeder')
    
//     try{
//     const dbFull = await Models.findAll();
//     if(dbFull.length>0){console.log("la base ya tiene datos")}
//     else{
//         shoes.map ((shoe) => {
//              Models.findOrCreate({
//                  where: {
//                     brandId: shoe.brand?shoe.brand:"generic",
//                     gender: shoe.gender?shoe.gender:"generic",
//                     model: shoe.name?shoe.name:"generic",
//                     price: shoe.estimatedMarketValue?shoe.estimatedMarketValue:100,
//                     description: shoe.story ? shoe.story : "The footwear that everyone wants to have",
//                     images: shoe.image.original ? shoe.image.original : "https://image.goat.com/attachments/product_template_pictures/images/070/791/134/original/GZ4000.png.png"
//                  }
//                 })
//         })
//         return "Database is Loaded";
//     }
//     }catch(err){
//         console.log(err)
//     };}



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


module.exports = {seeder, seedBrand}
