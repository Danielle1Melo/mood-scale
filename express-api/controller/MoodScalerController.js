import MoodScalerService from "../service/MoodScalerService.js";

class MoodScalerController {
  constructor() {
    this.service = new MoodScalerService();
  }

  async criar(req, res, next) {
    try {
      const { humor } = req.body;
      const ip_address =
        req.ip ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        null;

      const dadosVoto = { humor, ip_address };

      const resultado = await this.service.criarVoto(dadosVoto);

      return res.status(201).json({
        success: true,
        message: resultado.message || "Voto registrado com sucesso!",
        data: resultado.data || resultado,
      });
    } catch (error) {
      return next(error);
    }
  }

  async listar(req, res, next) {
    try {
      const result = await this.service.listar(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  async buscarPorId(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.service.buscarPorId(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  async estatisticas(req, res, next) {
    try {
      const result = await this.service.getStatistics(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default MoodScalerController;
