import MoodScalerService from '../service/MoodScalerService.js';

class MoodScalerController {
    constructor() {
        this.moodScalerService = new MoodScalerService();
    }

    async criar(req, res) {
        try {
            const { humor } = req.body;
            const ip_address = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 
                              (req.connection.socket ? req.connection.socket.remoteAddress : null);

            const dadosVoto = {
                humor,
                ip_address
            };

            const resultado = await this.moodScalerService.criarVoto(dadosVoto);

            return res.status(201).json({
                success: true,
                message: resultado.message,
                data: {
                    id: resultado.data._id,
                    humor: resultado.data.humor,
                    timestamp: resultado.data.timestamp
                }
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }
}

export default MoodScalerController;
