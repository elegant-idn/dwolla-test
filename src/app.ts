import express from "express";
import timeRouter from "./routes/time";

const app = express();
const port = process.env.PORT || 3000;

app.use("/time", timeRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
