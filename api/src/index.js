import app from "./app.js";
import { sequelize } from "./db.js";
import dotenv from "dotenv";
import { createRoles, seedBrand, seeder, seedSize } from "./seeder/index.js";
import "./models/Brands.js";
import "./models/Category.js";
import "./models/Orders.js";
import "./models/Products.js";
import "./models/Role.js";
import "./models/ShoppingCart.js";
import "./models/Sizes.js";
import "./models/User.js";
dotenv.config();

async function main() {
  try {
    await sequelize
      .authenticate()
      .then(() => console.log("success"))
      .catch((e) => console.log(e));
    await sequelize.sync({ force: true });
    app.listen(process.env.PORT || 3001, async () => {
      await seedBrand();
      await seedSize();
      await createRoles();
      await seeder();
      console.log("Server is running on port 3001");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
