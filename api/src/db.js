require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// console.log(DB_USER, DB_PASSWORD, DB_HOST, DB_NAME);
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@localhost/HenryShoes`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
// const { Brands } = sequelize.models;
const { Brands, Products, User, Role, Category, Sizes, Orders, ShoppingCart } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Brands.hasMany(Products, {
  foreignKey: "brandName",
  sourceKey: "name",
});

Products.belongsTo(Brands, {
  foreignKey: "brandName",
  targetKey: "name",
});

Role.hasMany(User, {
  foreignKey: "roleId",
  sourceKey: "id",
});
User.belongsTo(Role, {
  foreignKey: "roleId",
  targetKey: "id",
});

Category.hasMany(Products, {
  foreignKey: "CategName",
  sourceKey: "name",
});

Products.belongsTo(Category, {
  foreignKey: "CategName",
  targetKey: "name",
});


Products.belongsToMany(Sizes, { through: "products_sizes" });
Sizes.belongsToMany(Products, { through: "products_sizes" });

User.belongsToMany(Products, {through: "wishlist"})
Products.belongsToMany(User, {through: "wishlist"})

ShoppingCart.belongsToMany(Orders, {through: "ShoppingOrder"})
Orders.belongsToMany(ShoppingCart, {through: "ShoppingOrder"})

User.hasOne(ShoppingCart ,{foreignKey:"username", sourceKey:"username"})
ShoppingCart.belongsTo(User,{foreignKey:"username", targetKey:"username"})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
