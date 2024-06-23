import mongoose from "mongoose";

const imageUpload = new mongoose.Schema({
    title: String,
    img: String
},
);
  

const imageSchema = mongoose.model("images", imageUpload);
export default imageSchema;  