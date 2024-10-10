import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  f_Id: { type: String, required: true },
  f_Name: { type: String, required: true },
  f_Email: { type: String, required: true },
  f_Mobile: { type: String, required: true },
  f_Designation: { 
      type: String, 
      required: true, 
      enum: ['HR', 'Manager', 'Sales'],
    },
    f_Gender: {
        type: String,
        required: true,
        enum: ['M', 'F'],
    },
    f_Course: {
        type: String,
        required: true,
        enum: ['MCA', 'BCA', 'BSC'],
    },
    f_Image: { type: String },
},{
    timestamps:true
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;