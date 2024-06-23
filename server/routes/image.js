// import uploadMiddleware from "../model/img";
import uploadMiddleware from "../model/img.js";
import posts from "../categories/posts.js";
import { v2 as cloudinary } from "cloudinary";

import { Router } from "express";
import fs from "fs"
import path, {dirname} from "path";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import .meta.url);
const __dirname = dirname(__fileName)


const router = Router()
router.get("/get", async(req, res) => {
    const allImages = await  posts.find();
    res.send(allImages);
})
 

router.post("/post", uploadMiddleware.single("img"), async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const cat = req.body.cat;
    const link = [req.body.edLink, req.body.linkT];
    const mod = req.body.mod;

    // Upload image to Cloudinary
    const uploadedImg = await cloudinary.uploader.upload(req.file.path, {
      folder: 'defex-img'
    });

    // Delete the image from disk storage after it has been uploaded to Cloudinary
    const filePath = path.join(__dirname, '../../', req.file.path);
    fs.unlink(filePath, (err) => {
     
    });

    // Create post with uploaded image URL
    const postData = {
      title: title,
      content: content,
      img: uploadedImg.secure_url,
      imgId: uploadedImg.public_id,
      cat: cat,
      link: link,
      mod: mod
    };

    // Save post data to database
    const createdPost = await posts.create(postData);

    res.send(createdPost);

  } catch (error) {
    res.status(500).json({ error: 'Failed to upload post' });
  }
});


router.put("/post/:postId", uploadMiddleware.single("img"), async (req, res) => {
  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  const mod = req.body.mod;

  try {
      // Find the post by ID
      const post = await posts.findById(postId);
      if (!post) {
          throw new Error("Post not found");
      }

      // Handle image upload to Cloudinary if a new image is provided
          // Upload new image to Cloudinary
          const uploadedImg = await cloudinary.uploader.upload(req.file.path, {
            folder: 'defex-img'
          });

          // Delete old image from Cloudinary if it exists
          if (post.img) {
          }

          // Update post with new image URL
              post.img = uploadedImg.secure_url;
              post.imgId = uploadedImg.public_id;

      // Update post attributes
      post.title = title;
      post.content = content;
  
      post.mod = mod;   

      // Save updated post to database
      const updatedPost = await post.save();
// Delete the image from disk storage after it has been uploaded to Cloudinary
const filePath = path.join(__dirname, '../../', req.file.path);
fs.unlink(filePath, (err) => {
 
});

 
      res.send(updatedPost);
  } catch (error) {
      res.status(500).send("Error updating post");
  }
});

router.delete("/delete", async (req, res) => {
  const imgPublicId = req.body.img; // Assuming you store Cloudinary's public_id in req.body.img
   
  try {
      // Attempt to delete the image information from the database
      const deletedPost = await posts.findByIdAndDelete(req.body.id); 
      // If the database deletion is successful, proceed with file deletion on Cloudinary
      const deletionResult = await cloudinary.uploader.destroy(imgPublicId);

      if (deletionResult.result === 'ok') {
          res.json({ message: "Image and post deleted successfully" });
      } else {
          res.status(500).json({ message: "Error deleting image from Cloudinary" });
      }




  } catch (error) {
      res.status(500).json({ message: "Error deleting image and post" });
  }
});



const imageRoute = router;
export default imageRoute;
