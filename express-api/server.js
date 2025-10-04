import express from 'express';
import moodScalerRoutes from './routes/moodScalerRoutes.js';
import { errorHandler, notFoundHandler } from './utils/helpers/index.js';

const app = express();
const router = express.Router();

app.use(express.json());

router.get('/', (req, res) => {
    res.send('Hello from the router!');
});

app.use(moodScalerRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});