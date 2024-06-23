import multer from "multer";
import { v4 as uuidv4} from "uuid";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';

dotenv.config();


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
  });



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
;    }, 
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
    }
});


const uploadMiddleware = multer({storage}); 

export default uploadMiddleware;