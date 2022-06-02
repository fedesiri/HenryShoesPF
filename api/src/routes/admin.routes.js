import { Router } from "express";
import passport from "passport";
import {
  createProduct,
  modifProduct,
  deleteProduct,
  ofertSelect,
  deletePromotion,
  deleteDestacado,
  deleteManyProducts,
  getAllSizes
} from "../controllers/products.controller.js";
import {
  getCategory,
  createCategory,
  modifCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { getAllBrands, createBrand, updateBrand, deleteBrand, deleteManyBrands } from "../controllers/brands.controller.js";

const router = Router();

//Products
router.post("/create-products", createProduct);
router.post("/ofert", ofertSelect);
router.put("/update-product/:id", modifProduct);
router.put("/sale", ofertSelect);
router.put("/deletePromotion", deletePromotion);
router.put("/deleteDestacado", deleteDestacado);
router.delete("/delete/:id", deleteProduct);
router.delete("/delete-many-products", deleteManyProducts)

//Categories
router.get("/category", getCategory);
router.post("/create-categories", createCategory);
router.put("/update-category/:id", modifCategory);
router.delete("/delete-category/:id", deleteCategory);

//Brands

router.get("/brands", getAllBrands)
router.post("/create-brand", createBrand)
router.put("/update-brand/:id", updateBrand)
router.delete("/delete-brand/:id", deleteBrand)
router.delete("/delete-all-brands", deleteManyBrands)

//sizes
router.get("/sizes", getAllSizes)

//User
// router.put('/update/user', passport.authenticate('jwt', {session: false}), roleVerify, userUpdateController);
// router.post('/create/user', passport.authenticate('jwt', {session: false}), roleVerify, createUserController);
// router.delete('/delete/user', passport.authenticate('jwt', {session: false}), roleVerify, deleteUserController);
// router.get('/users', passport.authenticate('jwt', {session: false}), roleVerify, getAllUsersController);

export default router;
