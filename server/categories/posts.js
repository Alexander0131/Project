import mongoose from 'mongoose';


const PostSchema = new mongoose.Schema(
  {
    
      title:{type: String, required:true, unique:true},
      content: {type: String},
      img: {type: String},
      imgId: {type: String},
      cat: {type: String, required:true},
      link: {type: Array},
      mod: {type: Array}
  },  {timestamps: true } 
);   
           
const posts = mongoose.model("post", PostSchema);
export default posts;