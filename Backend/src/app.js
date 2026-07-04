const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    credentials: true,
}))

/**
 * Routes
 */
const authRoutes = require("./routes/auth.routes")
const songRoutes = require("./routes/song.routes")

app.use("/api/auth", authRoutes)
app.use("/api/songs", songRoutes)

module.exports = app