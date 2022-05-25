import {Router} from "express";
import { isUserAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.get('/auth', isUserAuthenticated, (req, res) => {
    res.send(req.user);
})



export default router;