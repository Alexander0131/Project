import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../model/User.js";
import dotenv from 'dotenv';

dotenv.config()

const userScheme = User;
const router = express.Router();
const SECRET_KEY = process.env.BCRYPT_KEY;


// User Registration  
router.post('/register', async (req, res) => {
  try {  
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userScheme({
      username: username, 
      password: hashedPassword, 
      isAdmin: false
    });   
 
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }   
});
// delete acc
router.delete("/delete/:id", async (req, res)=>{
  try {
     await userScheme.findByIdAndDelete(req.params.id,
          );
          res.status(200).json("Post has been deleted");
  } catch (err) {
      res.status(500).json(err)
  }
});

// User Account Edit
router.put("/account/edit/:id", async (req, res) => {
  const itemData = req.body;
  try {
    // Fetch the user from the database based on the :id parameter
    
    const user = await userScheme.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if(itemData.conPass !== "" && itemData.allow){
      const passwordMatch = await bcrypt.compare(itemData.password, user.password);  

    if (passwordMatch || itemData.purpose === "forgetPass") {
      const hashedPassword = await bcrypt.hash(itemData.conPass, 10);
          
      // Update the user's account details
      if(itemData.username){
        user.username = itemData.username;
      }
      user.password = hashedPassword, user.password;
      await user.save();
      
      res.status(200).json(user); // Respond with the updated user object
    } else {
      res.status(401).json({ message: 'Wrong Password' });
    }
  }else{
    const passwordMatch = await bcrypt.compare(itemData.password, user.password); 
    if(passwordMatch && itemData.allow){
    user.username = itemData.username;
    await user.save();

    res.status(200).json(user); 
    }
    else{
    res.status(400).json({ message: 'Inncorrect Password' });

    }
  }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// User Login
router.post('/login', async (req, res) => {
  try {
    const bodyEle = req.body;
    const reqUsername = req.body.username;
    const user = await userScheme.findOne({ username: reqUsername });
    const getLinkSt = bodyEle.password;
    
    
    if (!user) { 
      return res.status(401).json({ message: 'Authentication failed' });
    }
      
      if(req.body.purpose === "login" || (req.body.purpose === "delete" && getLinkSt)){
    // Compare the provided password with the hashed password stored in the link array
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    // const passwordMatch = "hello";


    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
   
    
    const token = jwt.sign({ username: user.username }, SECRET_KEY);
    res.status(200).json({ userId: user._id });
  }

  } catch (error) {
    res.status(500).json({ message: 'Authentication failed' });
  }

});


router.get("/get", async(req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
      let fetchedUsers;

      if (qNew) {
          fetchedPosts = await userScheme.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
          fetchedUsers = await userScheme.find({
              username: {
                  $in: [req.query.username],
              },
          });
      } else {
          fetchedUsers = await userScheme.find();
      }
      res.json(fetchedUsers); // Send the fetched posts
  } catch (err) {
      res.status(500).json(err);
  }
})










export default router;
