require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const {Models} = require("../models/Models");

// const jsonRead = JSON.parse(
//     fs.readFileSync(`${__dirname}/AllShoes.json`, 'utf-8')
// );

let parsedJson = require('../AllShoes.json');
let result = parsedJson.result;

console.log(result[0])
console.log("probandoooooo")

const seeder = async () => {
    const shoes = await jsonRead.result;
    console.log(shoes[0], "esto es shoes")
    console.log('prueba')
    try{
        for (let index = 0; index < shoes.length; index++) {
            const newShoe = {
                id: shoes[i].id,
                brandId: shoes[i].brand,
                gender: shoes[i].gender,
                model: shoes[i].name,
                price: shoes[i].estimatedMarketValue,
            }
            await Models.Create(newShoe)
        }
    }catch(err){
        console.log("no se han cargado los datos")
    };
}

seeder();