import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import moodScalerRoutes from './routes/moodScalerRoutes.js';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Trust proxy for getting correct IP addresses
app.set('trust proxy', true);

// Connect to MongoDB
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI.replace(/"/g, '')) // Remove aspas da URI
    .then(() => console.log('Conectado ao MongoDB Atlas!'))
    .catch(err => console.error('Erro de conexão MongoDB:', err));
} else {
    console.log('Rodando em modo teste (sem banco de dados)');
}

// Routes
app.use('/api', moodScalerRoutes);

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Mood Scale API is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Erro interno do servidor',
        data: null
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Rota não encontrada',
        data: null
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});