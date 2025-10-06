import MoodScaler from '../model/MoodScaler.js';

class MoodScalerService {
    async criarVoto(dadosVoto) {
        try {
            const novoVoto = new MoodScaler({
                humor: dadosVoto.humor,
                ip_address: dadosVoto.ip_address || null
            });

            const votoSalvo = await novoVoto.save();
            
            return {
                success: true,
                data: votoSalvo,
                message: 'Voto registrado com sucesso!'
            };
        } catch (error) {
            throw new Error(`Erro ao registrar voto: ${error.message}`);
        }
    }
}

export default MoodScalerService;