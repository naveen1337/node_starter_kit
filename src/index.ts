import express from "express";
import "dotenv/config";
import { dbConnection } from "./configs/db-config";
import orgRoutes from "./routes/org-rts";
import zoneRoutes from "./routes/zone-rts";
import appRoutes from "./routes/app-rts";
import userRoutes from "./routes/user-rts";

const app = express();

// disable if you want stack trace
// Error.stackTraceLimit = 3;

const PORT = process.env.PORT || 5000;

app.use("*", express.json());
app.use("/app", appRoutes);
app.use("/zone", zoneRoutes);
app.use("/orgs", orgRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.json({
    status: true,
    msg: "Hello World !!!",
  });
});

app.listen(PORT, () => {
  console.log(`App Listing on ${PORT}`);
});
