import posts from "../categories/posts.js";
import { Router } from "express";
import NodeCache from "node-cache";


const router = Router();

//Update posts
router.put("/:id", async (req, res)=>{
    try {
        const updatedPost = await posts.findByIdAndUpdate(req.params.id,

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

//delete post
router.delete("/:id", async (req, res)=>{
    try {
       await posts.findByIdAndDelete(req.params.id,
            );
            res.status(200).json("Post has been deleted");
    } catch (err) {
        res.status(500).json(err)
    }
});

//Get post
router.get("/find/:id", async (req, res)=>{
    try {
        const Post = await posts.findById(req.params.id,
            res.send("Post have been fetched successfully")
            );
            res.status(200).json(Post);
    } catch (err) {
        res.status(500).json(err)
    }
});

//Get all Post

const cache = new NodeCache({ stdTTL: 900 });
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
        let fetchedPosts;
     

        if (qNew) {
            fetchedPosts = await posts.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            fetchedPosts = await posts.find({
                cat: {
                    $in: [qCategory],
                },
            });
        } else {
            fetchedPosts = await posts.find();
        }


        res.json(fetchedPosts); 
    } catch (err) {
        res.status(500).json(err);
    }
});






const postRoute = router; 
export default postRoute;