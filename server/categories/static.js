import mongoose from "mongoose";

const staticDoc = new mongoose.Schema({
    title: {type: String},
    desc: {type: String},
    cat: {type: String},
    link: {type: Array},
    sec: {type: Number}
},
   { timestamps: true}
);
const staticOut = mongoose.model("static", staticDoc);
export default staticOut;    