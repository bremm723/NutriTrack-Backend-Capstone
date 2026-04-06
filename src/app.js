import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "./config/passport.js";

import authRoutes from "./routes/auth.routes.js";
import foodRoutes from "./routes/food.routes.js";
import trackingRoutes from "./routes/tracking.routes.js";
import userRoutes from "./routes/user.routes.js";
import notifikasiRoutes from "./routes/notifikasi.routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/food", foodRoutes);
app.use("/tracking", trackingRoutes);
app.use("/user", userRoutes);
app.use("/notifikasi", notifikasiRoutes);

app.get("/", (req, res) => res.send("NutriTrack API Running 🚀"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});