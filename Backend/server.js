const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./db');
const User = require('./models/user');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Serve static files from the Frontend folder
app.use(express.static(path.join(__dirname, '../Frontend')));

// Serve pizza.html on root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/pizza.html'));
  
});
 


app.post('/api/contact', async (req, res) => {
  const { name, phone, email, address } = req.body;
  console.log('Received contact:', req.body); // <-- ADD THIS

  try {
    const user = new User({ name, email, phone, address });
    await user.save();
    res.status(201).json({ message: 'User saved successfully' });
  } catch (error) {
    console.error('Error saving user:', error); // <-- ADD THIS
    res.status(500).json({ error: 'Failed to save user' });
  }
});
 app.get('/api/check-user', async (req, res) => {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number required' });
  }

  try {
    const user = await User.findOne({ phone });
    if (user) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
