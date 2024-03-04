const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const {xss} = require('express-xss-sanitizer');
const ratelimit = require('express-rate-limit');

const cars = require("./routes/cars");
const auth = require("./routes/auth");
const bookings = require("./routes/bookings");
const shops = require("./routes/shops");

const app = express();
dotenv.config({ path: "./config/config.env" });

const limiter = ratelimit.rateLimit({
    windowMs:10 * 60 * 1000,
    max: 100
});

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(limiter);

app.use("/api/v1/cars", cars);
app.use("/api/v1/auth", auth);
app.use("/api/v1/bookings", bookings);
app.use("/api/v1/shops", shops);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(
        "Server running in",
        process.env.NODE_ENV,
        "mode on PORT",
        PORT
    );
});

process.on("unhandledRejection", (err, promise) => {
    console.log("ERR:", err.message);
    server.close(() => {
        process.exit(1);
    });
});
