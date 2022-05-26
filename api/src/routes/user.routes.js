import {Router} from "express";
import { editUser, getAllUsers, getUserById, deleteUser } from "../controllers/user.controller.js";
import { isUserAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.get('/auth', isUserAuthenticated, (req, res) => {
    res.send(req.user);
})

router.get('/', getAllUsers)
router.get('/:id', getUserById) 
router.put('/edit/:id', editUser)
router.delete('/delete/:id', deleteUser)

export default router;