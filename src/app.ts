const express = require("express");
import { config } from "dotenv";
import cors from "cors";

import { apiRouter } from "./routes/apiRoute";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";

void config();
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(
  cors({
    origin: process.env.FE_URL,
    optionsSuccessStatus: 200,
    methods: "*",
    credentials: true,
  })
);

app.use(apiRouter);

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`);
});
