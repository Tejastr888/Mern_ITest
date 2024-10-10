import Employee from "../models/employee.model.js";
import Login from "../models/login.model.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import { generateTokenSetCookie } from "../utils/generateTokenSetCookie.js";

export const signup = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password) {
      throw new Error("All fields are required");
    }
    const userAlreadyExist = await Login.findOne({ f_userName: userName });
    if (userAlreadyExist) {
      return res.status(400).json({
        success: false,
        message: `User by the name ${userName} already exist`,
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const f_sno = crypto.createHash("sha256").update(userName).digest("hex");
    const login = new Login({
      f_sno,
      f_userName: userName,
      f_Pwd: hashedPassword,
    });

    await login.save();
    generateTokenSetCookie(res, login._id);
    res.status(201).json({
      success: true,
      message: "user created successfully",
      user: {
        ...login._doc,
        f_Pwd: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await Login.findOne({ f_userName: userName });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }

    const isPasswordvalid = await bcryptjs.compare(password, user.f_Pwd);
    if (!isPasswordvalid) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }
    generateTokenSetCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: "logged in successfully",
      user: {
        ...user._doc,
        f_Pwd: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login fuc");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  console.log("create employee");
  const { name, email, mobile, designation, gender, course } = req.body;

  try {
    if (!name || !email || !mobile || !designation || !gender || !course) {
      throw new Error("All fields are required");
    }

    // Check if user already exists
    const userAlreadyExist = await Employee.findOne({ email });
    if (userAlreadyExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Automatically generate f_Id (incremented value)
    const f_Id = crypto.createHash("sha256").update(email).digest("hex");

    let imagePath = "something";
    // if (req.file) {
    //   imagePath = path.join('uploads/', req.file.filename); // Relative path to the uploaded image
    // }

    // Create a new employee
    const employee = new Employee({
      f_Id,
      f_Name: name,
      f_Email: email,
      f_Mobile: mobile,
      f_Designation: designation,
      f_Gender: gender,
      f_Course: course,
      f_Image: imagePath,
    });

    // Save the employee to the database
    await employee.save();
    res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const checkauth = async (req, res) => {
  try {
    const user = await Login.findById(req.userId).select("-f_Pwd");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("error in checkauth", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
