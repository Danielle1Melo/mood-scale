import MoodScalerService from '../service/MoodScalerService.js';

class MoodScalerController {
    constructor() {
        this.service = new MoodScalerService();
    }

    async listar(req, res) {
        try {
            const result = await this.service.listar(req.query);
            
            res.status(200).json(result);
            
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                data: {
                    timestamp: new Date().toISOString(),
                    endpoint: req.originalUrl,
                    method: req.method
                }
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const result = await this.service.buscarPorId(id);
            
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                data: {
                    timestamp: new Date().toISOString(),
                    endpoint: req.originalUrl,
                    method: req.method,
                    requestedId: req.params.id
                }
            });
        }
    }

    async statistics(req, res) {
        try {
            const result = await this.service.getStatistics(req.query);
            
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                data: {
                    timestamp: new Date().toISOString(),
                    endpoint: req.originalUrl,
                    method: req.method
                }
            });
        }
    }
}

export default MoodScalerController;