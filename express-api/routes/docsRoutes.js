import express from "express";
import { apiReference } from "@scalar/express-api-reference";
import swaggerJsDoc from "swagger-jsdoc";
import generateOpenAPIDocs, { apiDocPaths } from "../docs/head.js";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

function registerDocPaths(registry, apiDocPaths) {
    Object.entries(apiDocPaths).forEach(([path, methods]) => {
        Object.entries(methods).forEach(([method, doc]) => {
        });
    });
}

export const getDocsRouter = () => {
    const router = express.Router();

    router.get("/", (req, res) => {
        res.status(200).redirect("/reference/");
    });

    let swaggerDocs = null;
    router.get("/reference/openapi.json", (req, res) => {
        if (!swaggerDocs) {
            const registry = new OpenAPIRegistry();

            registerDocPaths(registry, apiDocPaths);

            swaggerDocs = swaggerJsDoc(generateOpenAPIDocs());
        }
        res.json(swaggerDocs);
    });

    router.use(
        "/reference",
        apiReference({
            url: "/reference/openapi.json",
        }),
    );

    return router;
};