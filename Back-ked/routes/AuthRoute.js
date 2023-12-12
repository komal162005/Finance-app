const express=require('express');
const router = express.Router();
const mongoose=require('mongoose');
const User= mongoose.model("User");
const jwt=require('jsonwebtoken');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt');
require('dotenv').config();
router.use(bodyParser.json())
router.post('/signup',(req,res)=>{
        const {fname,email,password,ConfirmPassword}=req.body;
        console.log(req.body);
        
        User.findOne({email:email})
        .then(async(savedUser)=>{
            if(savedUser){
                return res.send({error:"Invalid Credentials"});
            }
            const user = new User({
                fname,
                email,
                password,
                ConfirmPassword
            })
            try{
                await user.save();
                // res.send({Message:"User Saved Successfully"});
                const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
                res.send({token});
            }
            catch(err){
                console.log("Character error: ",err);
                return res.send({error:err.Message})
            }
        })
         
    })
    router.post('/signin', async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "Please add email or password" });
        }
        const savedUser = await User.findOne({ email: email })
    
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid Credentials" });
        }
    
        try {
            bcrypt.compare(password, savedUser.password, (err, result) => {
                if (result) {
                    console.log("Password matched");
                    const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
                    res.send({ token });
                }
                else {
                    console.log('Password does not match');
                    return res.status(422).json({ error: "Invalid Credentials" });
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    })
    
module.exports=router;
