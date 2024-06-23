import trackModel from "../model/track.js";
import { Router } from "express";


const router = Router();

 
//Get all Post
router.get("/get", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let fetchedPosts;
        if (qNew) {
            fetchedPosts = await trackModel.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            fetchedPosts = await trackModel.find({
                cat: {
                    $in: [qCategory],
                },
            }); 
        } else {
            fetchedPosts = await trackModel.find();
        }

        // cache.set(cacheKey, fetchedPosts);

        res.json(fetchedPosts); 
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update posts
router.put("/mod/:id", async (req, res)=>{
    try {
        const updatedPost = await trackModel.findByIdAndUpdate(req.params.id,
  
            { 
                $set: req.body,
            },
            { new: true }
            );
            res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err)
       
    }
});

const trackRoute = router; 
export default trackRoute;