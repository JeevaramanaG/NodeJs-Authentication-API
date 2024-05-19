const User = require("../Model/userModel");
const bcrypt = require("bcrypt");

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
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.json(error);
  }
};
module.exports = { userCreate, userLogin };
