export const asyncWrapper = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const errorHandler = (err, req, res, next) => {
    console.error('Erro capturado:', err);

    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'ID inválido',
            meta: {
                timestamp: new Date().toISOString(),
                endpoint: req.originalUrl,
                method: req.method
            }
        });
    }

    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Recurso já existe',
            meta: {
                timestamp: new Date().toISOString(),
                endpoint: req.originalUrl,
                method: req.method
            }
        });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Erro interno do servidor',
        meta: {
            timestamp: new Date().toISOString(),
            endpoint: req.originalUrl,
            method: req.method
        }
    });
};

export const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Rota não encontrada',
        meta: {
            timestamp: new Date().toISOString(),
            endpoint: req.originalUrl,
            method: req.method
        }
    });
};