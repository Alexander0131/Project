import staticOut from "../categories/static.js";
import express from "express"

const router = express.Router();

router.use(express.json());

// Define the route to update a document
router.put("/edit/:id", async (req, res) => {
    try {
        const updateDoc = await staticOut.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updateDoc) {
            // If the document with the specified ID doesn't exist, return a 404 Not Found response
            return res.status(404).json({ error: 'Document not found' });
        }

        res.status(200).json(updateDoc);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post("/", async(req, res) => {
    const title = req.body.title;
    const desc = req.body.desc;
    // imageSchema.create({title})
    staticOut.create({title,
        desc})
    
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
    })
})

router.put("/edit/:id", (req, res) =>{
    try {
        const updateDoc = staticOut.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {new: true})
        res.status(200).json(updateDoc);
    } catch (error) {
        
    }
});

router.get("/", async(req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
        let fetchedPosts;

        if (qNew) {
            fetchedPosts = await staticOut.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            fetchedPosts = await staticOut.find({
                cat: {
                    $in: [qCategory],
                },
            });
        } else {
            fetchedPosts = await staticOut.find();
        }
        res.json(fetchedPosts); // Send the fetched posts
    } catch (err) {
        res.status(500).json(err);
    }
})

const UpdateStatic = router;
export default UpdateStatic;