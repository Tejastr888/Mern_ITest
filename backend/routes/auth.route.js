import express from "express";
import {
  createEmployee,
  signup,
  logout,
  login,
  checkauth,
  getPaginatedEmployees,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();
router.get("/check-auth", verifyToken, checkauth);
router.post("/signup", signup);
router.post("/logout", logout);
router.post("/createemployee", createEmployee);
router.post("/login", login);
router.get("/employees", getPaginatedEmployees);

export default router;
