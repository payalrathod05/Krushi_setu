const express = require('express');
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors()); 
// 1. Import ONLY the farmer routes
const farmerRoutes = require('./routes/farmerRoutes'); 
// 2. Import the schemes routes (this was missing!)
const schemeRoutes = require('./routes/schemeRoutes');
const adminRoutes = require('./routes/adminRoutes');
// Middleware to parse JSON bodies
app.use(express.json());

// 3. Use ONLY the farmer routes for any request to /api/farmers
app.use('/api/farmers', farmerRoutes);
// 4. Use the schemes routes for /api/schemes
app.use('/api/schemes', schemeRoutes);
//5. use only for the admin routes
app.use('/api/admin', adminRoutes);
//5 fro the admin routes

// A simple base route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});