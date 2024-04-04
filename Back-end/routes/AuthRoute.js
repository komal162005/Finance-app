const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
router.use(bodyParser.json());
router.use(cors());
const { exec } = require("child_process");
const users = new Map();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const incomeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  source: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const IncomeModel = mongoose.model("Income", incomeSchema);

const expenseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const ExpenseModel = mongoose.model("Expense", expenseSchema);

const goalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const GoalModel = mongoose.model("Goal", goalSchema);

const budgetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const BudgetModel = mongoose.model("Budget", budgetSchema);

const TaxRecordSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const TaxRecordModel = mongoose.model("Tax", TaxRecordSchema);

async function sendEmail(userEmail, message) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: "mekomal162005@gmail.com",
        pass: "xcxs msdc hkae bbcn",
      },
    });
    let info = await transporter.sendMail({
      from: "mekomal162005@gmail.com",
      to: userEmail,
      subject: "Hello User",
      text: `${message}`,
      html: `<b>${message}<b/>`,
    });
  } catch (err) {
    console.log(err);
  }
}

async function generateCode(length) {
  let result1 = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const characterLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result1 += characters.charAt(Math.floor(Math.random() * characterLength));
    counter += 1;
  }
  return result1;
}
router.post("/signup", (req, res) => {
  const { userId, fname, email, password, address, mobileNo } = req.body;
  console.log(req.body);

  if (!fname || !email || !password || !address) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  User.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      return res.send({ error: "Invalid Credentials" });
    }
    const user = new User({
      userId,
      fname,
      email,
      password,
      address,
      mobileNo,
    });
    try {
      await user.save();
      // res.send({Message:"User Saved Successfully"});
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.send({ token, userId });
    } catch (err) {
      console.log("Character error: ", err);
      return res.send({ error: err.Message });
    }
  });
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email or password" });
  }
  const savedUser = await User.findOne({ email: email });

  if (!savedUser) {
    return res.status(422).json({ error: "Invalid Credentials" });
  }
  try {
    bcrypt.compare(password, savedUser.password, (err, result) => {
      if (result) {
        console.log("Password matched");
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        const userId = savedUser.userId;
        res.send({ userId });
      } else {
        console.log("Password does not match");
        return res.status(422).json({ error: "Invalid Credentials" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/update", async (req, res) => {
  const { userId, fname, email, address, mobileNo } = req.body;
  console.log(req.body);
  try {
    const updateUser = await User.findOneAndUpdate(
      { userId: userId },
      { fname, address, mobileNo },
      { new: true }
    );
    res.send({ Message: "User Saved Successfully" });
  } catch (err) {
    console.log("Character error: ", err);
    return res.send({ error: err.Message });
  }
});

router.post("/income", async (req, res) => {
  try {
    const { userId, amount, source } = req.body;
    const newIncome = new IncomeModel({
      userId,
      amount,
      source,
    });
    await newIncome.save();
    res.send({ message: "Income entry added successfully" });
    console.log("income added");
  } catch (error) {
    console.error(error);
    res.send({ message: "Internal Server Error" });
  }
});
router.get("/income/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const incomeEntries = await IncomeModel.find({ userId: userId });
    res.json(incomeEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("TIncome", async (req, res) => {
  try {
    const total = await IncomeModel.count();
    res.json(total);
  } catch (error) {
    res.send({ message: "Error occured" });
  }
});
router.post("/expense", async (req, res) => {
  try {
    const { userId, amount, category } = req.body;
    const newExpense = new ExpenseModel({
      userId,
      amount,
      category,
    });
    await newExpense.save();
    res.send({ message: "Income entry added successfully" });
    console.log({ message: "Income entry added successfully" });
  } catch (error) {
    console.error(error);
    res.send({ message: "Internal Server Error" });
  }
});
router.get("/expense/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const expenses = await ExpenseModel.find({ userId: userId });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/goal", async (req, res) => {
  try {
    const { userId, amount, description } = req.body;
    const newGoal = new GoalModel({
      userId,
      amount,
      description,
    });
    await newGoal.save();
    console.log("Goal created");
    res.send({ message: "Goal created Successufully" });
  } catch (error) {
    res.send({ message: "Error in creating goal!!" });
  }
});

router.get("/goal/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const goals = await GoalModel.find({ userId: userId });
    res.status(200).json(goals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/budget", async (req, res) => {
  try {
    const { userId, amount, type } = req.body;
    const newBudget = new BudgetModel({
      userId,
      amount,
      type,
    });
    await newBudget.save();
    console.log("Budget cerated");
  } catch (error) {
    res.send({ message: "Some error occured!" });
  }
});

router.get("/budget/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const budget = await BudgetModel.find({ userId: userId });
    res.status(200).json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/taxRecord", async (req, res) => {
  try {
    const { userId, amount, type } = req.body;
    const newRecord = new TaxRecordModel({
      userId,
      amount,
      type,
    });
    await newRecord.save();
    res.send({ message: "tax record entry added successfully" });
  } catch (error) {
    console.error(error);
    res.send({ message: "Internal Server Error" });
  }
});
router.get("/taxRecord/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const taxEntries = await TaxRecordModel.find({ userId: userId });
    res.json(taxEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/resetpass", async (req, res) => {
  try {
    const email = req.body.email;
    const existingUser = User.findOne({ email });
    if (!existingUser) {
      console.error({ message: "There was an error" });
      return res.send({ message: "If the user exists, an email was sent" });
    }
    const token = await generateCode(5);
    User.resettoken = token;
    User.resettokenExpiration = Date.now() + 36000000;
    await User.save;
    await sendEmail(email, `Here is your reset token ${token}`);
    return res.send({ success: true, message: "Email sent" });
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
});

router.post("/resetPasswordConfirm", async (req, res) => {
  try {
    const email = req.body.email;
    const verificationCode = req.body.verificationCode;
    const password = req.body.password;
    const user = await User.findOne({ email });

    if (!user || user.resettoken !== verificationCode) {
      return res.send("Invalid Credential");
    }
    if (user.resettokenExpiration < new Date()) {
      return res.send("Token has expired.");
    }

    const hashedPassword = password;
    user.password = hashedPassword;
    user.token = "";
    user.tokenExpiration = null;
    await user.save();
    return res.send("Password saved");
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
});
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  User.find({ userId: userId })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

module.exports = router;
