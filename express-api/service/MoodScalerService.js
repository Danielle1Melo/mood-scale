import MoodScalerRepository from '../repository/MoodScalerRepository.js';

class MoodScalerService {
    constructor() {
        this.repository = new MoodScalerRepository();
    }

    async listar(query = {}) {
        const {
            page = 1,
            limit = 10,
            humor
        } = query;

        const validatedPage = Math.max(1, parseInt(page));
        const validatedLimit = Math.min(100, Math.max(1, parseInt(limit)));

        const validHumors = ['animado', 'entediado', 'neutro', 'estressado', 'triste'];
        if (humor && !validHumors.includes(humor)) {
            throw new Error(`Humor inválido. Confira os valores aceitos: ${validHumors.join(', ')}`);
        }

        const filters = {};
        if (humor) {
            filters.humor = humor;
        }

        const options = {
            page: validatedPage,
            limit: validatedLimit
        };

        const result = await this.repository.findAll(filters, options);

        return this.formatResponse(result, true);
    }

    async buscarPorId(id) {
        if (!id) {
            throw new Error('ID é obrigatório e deve ser uma string válida');
        }

        const moodScaler = await this.repository.findById(id);
        
        if (!moodScaler) {
            throw new Error('Mood scaler não encontrado');
        }

        return this.formatResponse(moodScaler);
    }

    async getStatistics(query = {}) {
        const stats = await this.repository.countByHumor();
        
        const total = stats.reduce((sum, stat) => sum + stat.count, 0);
        
        const statisticsWithPercentage = stats.map(stat => ({
            humor: stat._id,
            count: stat.count,
            percentage: total > 0 ? ((stat.count / total) * 100).toFixed(2) : 0
        }));

        return {
            success: true,
            data: {
                total,
                breakdown: statisticsWithPercentage,
                mostCommon: statisticsWithPercentage[0] || null
            },
            meta: {
                timestamp: new Date().toISOString(),
                totalHumorTypes: stats.length
            }
        };
    }

    formatResponse(data, isPaginated = false) {
        const response = {
            success: true,
            data: isPaginated ? data.docs : data,
            meta: {
                timestamp: new Date().toISOString()
            }
        };

        if (isPaginated) {
            response.pagination = {
                currentPage: data.page,
                totalPages: data.totalPages,
                totalItems: data.totalDocs,
                itemsPerPage: data.limit,
                hasNextPage: data.hasNextPage,
                hasPrevPage: data.hasPrevPage
            };
            response.meta.count = data.docs.length;
        }

        return response;
    }
}

export default MoodScalerService;