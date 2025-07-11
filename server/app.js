import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connect from "./src/config/connect.js";
import { PORT } from "./src/config/config.js";
import { buildAdminJS } from "./src/config/setup.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

//import routes
import userRoutes from "./src/routes/user.js";
import busRoutes from "./src/routes/bus.js";
import ticketRoutes from "./src/routes/ticket.js";
//use the routes
app.use("/user", userRoutes);
app.use("/bus", busRoutes);
app.use("/ticket", ticketRoutes);

//start server function
const start = async () => {
  try {
    await connect();
    await buildAdminJS(app);
    app.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
      if (err) console.log(err);
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
