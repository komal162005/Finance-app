const express=require('express');
const router = express.Router();
const mongoose=require('mongoose');
const User= mongoose.model("User");
const jwt=require('jsonwebtoken');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt');
const nodemailer=require('nodemailer');
require('dotenv').config();
router.use(bodyParser.json())

const incomeSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    source: { type: String, required: true },
    date: { type: Date, default: Date.now },
  });
  
const IncomeModel = mongoose.model('Income', incomeSchema);
  
const expenseSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
  });
  
const ExpenseModel = mongoose.model('Expense', expenseSchema);

const goalSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
  });

const GoalModel = mongoose.model('Goal',goalSchema);

const budgetSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    date: { type: Date, default: Date.now },
})

const BudgetModel=mongoose.model('Budget',budgetSchema);

const TaxRecordSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    date: { type: Date, default: Date.now },
  });
  
const TaxRecordModel = mongoose.model('Tax', TaxRecordSchema);


async function sendEmail(userEmail,message){
try{
    let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    secure:false,
    auth:{
        user:'mekomal162005@gmail.com',
        pass:'xcxs msdc hkae bbcn'
    }
})
let info=await transporter.sendMail({
    from :'mekomal162005@gmail.com',
    to:userEmail,
    subject:'Hello User',
    text:`${message}`,
    html:`<b>${message}<b/>`
})
}
catch(err){
    console.log(err)
}
}

async function generateCode(length){
    let result1='';
    const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const characterLength = characters.length;
    let counter =0;
    while (counter<length){
        result1 += characters.charAt(Math.floor(Math.random()*characterLength));
        counter+=1;
    }
    return result1;
}
router.post('/signup',(req,res)=>{
        const {userId,fname,email,password,address}=req.body;
        console.log(req.body);
        
        if (!fname || !email || !password || !address) {
            return res.status(422).json({ error: "Please add all the fields" });
        }
        User.findOne({email:email})
        .then(async(savedUser)=>{
            if(savedUser){
                return res.send({error:"Invalid Credentials"});
            }
            const user = new User({
                userId,
                fname,
                email,
                password,
                address
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
        const savedUser = await User.findOne({ email:email })
    
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
        
router.post('/income',async(req,res)=>{
    try {
        const {amount,source}=req.body;
        const newIncome= new IncomeModel({
            amount,
            source
        });
        await newIncome.save();
        res.send({ message: 'Income entry added successfully' });
      } catch (error) {
        console.error(error);
        res.send({ message: 'Internal Server Error' });
      }
})
router.get('/income',async(req,res)=>{
    try {
        const incomeEntries = await IncomeModel.find().sort({ date: 'desc' });
        res.json(incomeEntries);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
})
router.get('TIncome',async(req,res)=>{
    try{
        const total = await IncomeModel.count();
        res.json(total);
    }
    catch(error){
        res.send({message:'Error occured'})
    }
})
router.post('/expense',async(req,res)=>{
    try {
        const {amount,category}=req.body;
        const newExpense= new ExpenseModel({
            amount,
            category
        });
        await newExpense.save();
        res.send({ message: 'Income entry added successfully' });
      } catch (error) {
        console.error(error);
        res.send({ message: 'Internal Server Error' });
      }
})
router.get('/expense',async(req,res)=>{
    try{
        const expenses=await ExpenseModel.find().sort({date:'desc'});
        res.status(200).json(expenses);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
})

router.post('/goal',async(req,res)=>{
    try{
        const {amount,description}=req.body;
    const newGoal = new GoalModel({
        amount,
        description
    })
    await newGoal.save();
    console.log("Goal created")
    res.send({message:'Goal created Successufully'})
}
catch(error){
    res.send({message:'Error in creating goal!!'})
}
})

router.get('/goal',async(req,res)=>{
    try{
        const goals=await GoalModel.find().sort({date:'desc'});
        res.status(200).json(goals);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
})

router.post('/budget',async(req,res)=>{
    try{
        const {amount, type}=req.body;
        const newBudget= new BudgetModel({
            amount,
            type
        })
        await newBudget.save();
        console.log('Budget cerated')
    }
    catch(error){
        res.send({message:'Some error occured!'})
    }
})

router.get('/budget',async(req,res)=>{
    try{
        const budget=await BudgetModel.find().sort({date:'desc'});
        res.status(200).json(budget);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }

})

router.post('/taxRecord',async(req,res)=>{
    try {
        const {amount,type}=req.body;
        const newRecord= new TaxRecordModel({
            amount,
            type
        });
        await newRecord.save();
        res.send({ message: 'tax record entry added successfully' });
      } catch (error) {
        console.error(error);
        res.send({ message: 'Internal Server Error' });
      }
})
router.get('/taxRecord',async(req,res)=>{
    try {
        const taxEntries = await TaxRecordModel.find().sort({ date: 'desc' });
        res.json(taxEntries);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
})

    router.post('/resetpass',async(req,res)=>{
        try
        {
            const email=req.body.email;
            const existingUser = User.findOne({email});
            if(!existingUser){
                console.error({message:'There was an error'});
                return res.send({message:'If the user exists, an email was sent'});
            }
            const token=await generateCode(5);
            User.resettoken=token;
            User.resettokenExpiration=Date.now()+36000000;
            await User.save;
            await sendEmail(email,`Here is your reset token ${token}`)
            return res.send({success:true,message:'Email sent'});
            console.log('Email sent');
        }
        catch(error){
            console.error(error)
        }
    });
    
    router.post('/resetPasswordConfirm', async (req, res) => {
        try {
            const email = req.body.email
            const verificationCode = req.body.verificationCode
            const password = req.body.password
            const user = await User.findOne({ email });
            
            if (!user || user.resettoken !== verificationCode) {
              return res.send('Invalid Credential');
            }
            if (user.resettokenExpiration < new Date()) {
              return res.send('Token has expired.' );
            }
        
            const hashedPassword =password;
            user.password = hashedPassword;
            user.token = '';
            user.tokenExpiration = null;
            await user.save();
            return res.send('Password saved');
            
          } catch (error) {
            console.error(error);
            return res.status(500).send({ success: false, message: 'An error occurred. Please try again later.' });
          }    
    });
router.get('/user',async(req,res)=>{
    User.find()
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
    
})

module.exports=router;
