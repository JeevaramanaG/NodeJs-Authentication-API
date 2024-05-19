const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCreate = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Corrected to req.body instead of req.body()

    // Check if username already exists
    const existUsername = await User.findOne({ username }); // Corrected to use await and proper query syntax
    if (existUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10); // Corrected genSalt usage, with a proper number of salt rounds
    const hashPassword = await bcrypt.hash(password, salt); // Corrected hash usage

    // Create and save the user
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save(); // Save the new user to the database

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "Jeeva", { expiresIn: "5h" });

    res.status(200).json({
      message: "Login successful",
      id: user.id,
      user: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    return res.json(error);
  }
};

const userProfile = async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
};
module.exports = { userCreate, userLogin, userProfile };
