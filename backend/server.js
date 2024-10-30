import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/product.route.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/products", router);

app.listen(PORT, () => {
  connectDB();
  console.log(`Listening on port ${PORT}...`);
});
