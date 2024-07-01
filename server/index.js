import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoute from './routes/posts.js';
import cors from 'cors';
import imageRoute from './routes/image.js';
import UpdateStatic from './routes/static.js';
import authRoute from './routes/auth.js'
import trackRoute from './routes/track.js';


app.use(cors())
dotenv.config();
app.use(express.static("images"));


mongoose.connect(process.env.MONGO_URL)
.then(() =>{
}).catch((err)=>{
});

app.use(express.json())
app.use("/api/posts", postRoute);
app.use("/api/upload", imageRoute);
app.use("/api/static", UpdateStatic);  
app.use("/api/auth0", authRoute);  
app.use('/api/track', trackRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res)=>{
    console.log("hello" + PORT)
}); 