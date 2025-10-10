import { moodScalerDocs, moodScalerSchemas } from './moodScalerDocs.js';

export const apiDocPaths = {
    ...moodScalerDocs
};

const generateOpenAPIDocs = () => {
  return {
    swaggerDefinition: {
      openapi: "3.1.0",
      info: {
        title: "Mood Scale API",
        version: "1.0",
        description: "API para registro e análise de humores.",
        contact: {
          name: "Danielle Silva, Giullia Beatriz, Matheus Lucas e Taline.",
        },
      },
      servers: [
        {
          url: process.env.DOCS_API_URL || "http://localhost:3000",
        },
      ],
      paths: apiDocPaths,
      components: {
        schemas: moodScalerSchemas
      },
    },
    apis: [],
  };
};

export default generateOpenAPIDocs;