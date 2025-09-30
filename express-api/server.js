import express from 'express';

const app = express();
const router = express.Router();

// Example route
router.get('/', (req, res) => {
    res.send('Hello from the router!');
});

// Use the router
app.use('/api', router);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});