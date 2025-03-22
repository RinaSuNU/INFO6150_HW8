const User = require('../model/User');
const bcrypt = require('bcrypt');
const multer = require('multer');

// create user
exports.createUser = async (req, res) => {
    try {
      const { fullName, email, password } = req.body;

      if (!fullName || !email || !password) {
        return res.status(400).json({ error: 'Validation failed: Missing fields.' });
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Validation failed: Invalid email format.' });
      }
  
      const fullNameRegex = /^[a-zA-Z\s]+$/;
      if (!fullNameRegex.test(fullName)) {
        return res.status(400).json({ error: 'Validation failed: Full name must only contain alphabetic characters.' });
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          error: 'Validation failed: Password must be at least 8 characters long, with one uppercase letter, one lowercase letter, one digit, and one special character.'
        });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Validation failed: Email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        fullName,
        email,
        password: hashedPassword, 
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  };


// update user
exports.editUser = async (req, res) => {
    try {
        const { email, fullName, password } = req.body;
    
        if (!email) {
          return res.status(400).json({ error: "Validation failed: Email is required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found." });
        }
    
        if (fullName) {
          const fullNameRegex = /^[a-zA-Z\s]+$/; 
          if (!fullNameRegex.test(fullName)) {
            return res.status(400).json({ error: "Validation failed: Full name must only contain alphabetic characters and spaces." });
          }
          user.fullName = fullName; 
        }
    
        if (password) {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
          if (!passwordRegex.test(password)) {
            return res.status(400).json({
              error: "Validation failed: Password must be at least 8 characters long, with one uppercase letter, one lowercase letter, one digit, and one special character."
            });
          }
          const hashedPassword = await bcrypt.hash(password, 10); 
          user.password = hashedPassword; 
        }
    
        await user.save();
        res.status(200).json({ message: "User updated successfully." });
      } catch (error) {
        res.status(500).json({ error: "Internal server error." });
      }
};

// delete user
exports.deleteUser = async (req, res) => {
    try {
        const { email } = req.body;
    
        if (!email) {
          return res.status(400).json({ error: "Validation failed: Email is required." });
        }
    
        const user = await User.findOneAndDelete({ email });
        
        if (!user) {
          return res.status(404).json({ error: "User not found." });
        }
    
        res.status(200).json({ message: "User deleted successfully." });
      } catch (error) {
        res.status(500).json({ error: "Internal server error." });
      }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { fullName: 1, email: 1, password: 1 }); 
        res.status(200).json({ users }); 
      } catch (error) {
        res.status(500).json({ error: "Failed to retrieve users." }); 
      }
};

// upload image
const storage = multer.diskStorage({
    destination: './images', 
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); 
    },
  });

  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedFormats.includes(file.mimetype)) {
        return cb(new Error('Invalid file format. Only JPEG, PNG, and GIF are allowed.'));
      }
      cb(null, true);
    },
  });

  exports.uploadImage = (req, res) => {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message }); 
      }
  
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({ error: "Validation failed: Email is required." });
      }
  
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found." });
        }
  
        if (user.image) {
          return res.status(400).json({ error: "Image already exists for this user." });
        }
  
        user.image = `/images/${req.file.filename}`;
        await user.save();
  
        res.status(201).json({
          message: "Image uploaded successfully.",
          filePath: user.image,
        });
      } catch (error) {
        res.status(500).json({ error: "Internal server error." });
      }
    });
  };