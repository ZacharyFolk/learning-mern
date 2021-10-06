const express = require('express');
const app = express();

// Connect Database
const connectDB = require('./config/db');
connectDB();
app.get('/', (req, res) => res.send('API Running'));

// Init Middleware allows to get data from request.body
app.use(express.json({ extended: false }));

// If no env var set then just default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
