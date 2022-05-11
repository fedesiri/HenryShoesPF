require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const { Models } = require("../db");
const { secureHeapUsed } = require("crypto");
const db = require("../db");



const jsonRead = JSON.parse(
    fs.readFileSync(`${__dirname}/AllShoes.json`, 'utf-8')
);

// let parsedJson = require('../AllShoes.json');
// let result = parsedJson.result;


//console.log("probandoooooo")

async function seeder() {
    const shoes = jsonRead.result;
    // console.log(shoes[0], "esto es shoes")
    //console.log('funcion seeder')

    try {
        const dbFull = await Models.findAll();
        if (dbFull.length > 0) { console.log("la base ya tiene datos") }
        else {
            shoes.map((shoe) => {
                Models.findOrCreate({
                    where: {
                        brandId: shoe.brand ? shoe.brand : "generic",
                        gender: shoe.gender ? shoe.gender : "generic",
                        model: shoe.name ? shoe.name : "generic",
                        price: shoe.estimatedMarketValue ? shoe.estimatedMarketValue : 100,
                    }
                })
            })
            return "Database is Loaded";
        }
    } catch (err) {
        console.log(err)
    };
}

module.exports = { seeder }

// const getApiCountries = async () => {
//     try {
//       let countries = (await axios.get("https://restcountries.com/v3/all")).data;
//       countries = await Promise.all(
//         countries.map((country) => {
//           Country.findOrCreate({
//             where: {
//               id: country.cca3,
//               name: country.translations.spa.common,
//               flags: country.flags[1],
//               continent: country.continents[0],
//               capital: country.capital ? country.capital[0] : "Not found",
//               subregion: country.subregion ? country.subregion : "Not found",
//               area: country.area,
//               population: country.population,
//             },
//           });
//         })
//       );
//       return "Database loaded";
//     } catch (error) {
//       return error;
//     }
//   };