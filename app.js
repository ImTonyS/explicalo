import express from "express";
import taskRoutes from './src/routes/tasks.js'

const app = express();
app.use(express.json());
app.use(taskRoutes);

export default app;

