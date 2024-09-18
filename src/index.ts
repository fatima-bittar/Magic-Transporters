import express from "express";
import magicTransporterController from "./controllers/magicTransporterController";
import { configDotenv } from "dotenv";

const app = express();
configDotenv();
app.use(express.json());
app.use("/api", magicTransporterController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
