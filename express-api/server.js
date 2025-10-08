import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import moodScalerRoutes from "./routes/moodScalerRoutes.js";
import { errorHandler, notFoundHandler } from "./utils/helpers/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", true);

const mongoUri = process.env.MONGODB_URI || process.env.DB_URL;
if (mongoUri) {
  mongoose
    .connect(mongoUri.replace(/"/g, ""))
    .then(() => console.log("Conectado ao MongoDB Atlas!"))
    .catch((err) => console.error("Erro de conexão MongoDB:", err));
} else {
  console.log("Rodando em modo teste (sem banco de dados)");
}

app.use("/", moodScalerRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
