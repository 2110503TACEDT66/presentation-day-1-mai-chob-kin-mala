const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const cars = require("./routes/cars");
const auth = require("./routes/auth");
const bookings = require("./routes/bookings")

const app = express();
dotenv.config({ path: "./config/config.env" });

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/cars", cars);
app.use("/api/v1/auth", auth);
app.use("/api/v1/bookings", bookings);

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
