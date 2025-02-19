import express from "express";
import cors from "cors";
import rootRouter from "./src/routers/root.router.js";
import { handleError } from "./src/common/helpers/error.helper.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "google.com"],
  })
);

app.use(rootRouter);
app.use(handleError);

app.listen(3069, () => {
  console.log(`Server online at port 3069`);
});
