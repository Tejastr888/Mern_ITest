import express from "express";
import { login } from "../controllers/auth";


const router=express.Router();

router.post("/login",login);
router.post("/createemployee",login);
router.post("/editemployee",login);

export default router;
