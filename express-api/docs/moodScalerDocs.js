export const moodScalerDocs = {
  "/mood-scale": {
    post: {
      tags: ["MoodScale"],
      summary: "Registrar um voto de humor",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                humor: {
                  type: "string",
                  enum: ["animado", "entediado", "neutro", "estressado", "triste"],
                  example: "animado",
                },
              },
              required: ["humor"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Voto registrado com sucesso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/MoodVoteResponse",
              },
            },
          },
        },
        400: {
          description: "Requisição inválida",
        },
      },
    },
    get: {
      tags: ["MoodScale"],
      summary: "Listar votos de humor",
      parameters: [
        {
          name: "page",
          in: "query",
          schema: { type: "integer", default: 1 },
        },
        {
          name: "limit",
          in: "query",
          schema: { type: "integer", default: 10 },
        },
        {
          name: "humor",
          in: "query",
          schema: {
            type: "string",
            enum: ["animado", "entediado", "neutro", "estressado", "triste"],
          },
        },
      ],
      responses: {
        200: {
          description: "Lista de votos",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/MoodVotePaginatedResponse",
              },
            },
          },
        },
      },
    },
  },
  "/mood-scale/{id}": {
    get: {
      tags: ["MoodScale"],
      summary: "Buscar voto por ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Voto encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/MoodVoteResponse",
              },
            },
          },
        },
        404: {
          description: "Voto não encontrado",
        },
      },
    },
  },
  "/mood-scale/statistics": {
    get: {
      tags: ["MoodScale"],
      summary: "Obter estatísticas dos votos",
      responses: {
        200: {
          description: "Estatísticas de humor",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/MoodVoteStatisticsResponse",
              },
            },
          },
        },
      },
    },
  },
};

export const moodScalerSchemas = {
  MoodVote: {
    type: "object",
    properties: {
      _id: { type: "string" },
      humor: {
        type: "string",
        enum: ["animado", "entediado", "neutro", "estressado", "triste"],
      },
      timestamp: { type: "string", format: "date-time" },
      ip_address: { type: "string", nullable: true },
    },
  },
  MoodVoteResponse: {
    type: "object",
    properties: {
      success: { type: "boolean" },
      data: { $ref: "#/components/schemas/MoodVote" },
      message: { type: "string" },
      meta: {
        type: "object",
        properties: {
          timestamp: { type: "string", format: "date-time" },
        },
      },
    },
  },
  MoodVotePaginatedResponse: {
    type: "object",
    properties: {
      success: { type: "boolean" },
      data: {
        type: "array",
        items: { $ref: "#/components/schemas/MoodVote" },
      },
      pagination: {
        type: "object",
        properties: {
          currentPage: { type: "integer" },
          totalPages: { type: "integer" },
          totalItems: { type: "integer" },
          itemsPerPage: { type: "integer" },
          hasNextPage: { type: "boolean" },
          hasPrevPage: { type: "boolean" },
        },
      },
      meta: {
        type: "object",
        properties: {
          timestamp: { type: "string", format: "date-time" },
          count: { type: "integer" },
        },
      },
    },
  },
  MoodVoteStatisticsResponse: {
    type: "object",
    properties: {
      success: { type: "boolean" },
      data: {
        type: "object",
        properties: {
          total: { type: "integer" },
          breakdown: {
            type: "array",
            items: {
              type: "object",
              properties: {
                humor: { type: "string" },
                count: { type: "integer" },
                percentage: { type: "string" },
              },
            },
          },
          mostCommon: {
            type: "object",
            nullable: true,
            properties: {
              humor: { type: "string" },
              count: { type: "integer" },
              percentage: { type: "string" },
            },
          },
        },
      },
      meta: {
        type: "object",
        properties: {
          timestamp: { type: "string", format: "date-time" },
          totalHumorTypes: { type: "integer" },
        },
      },
    },
  },
};