import express from "express";
import taskRoutes from './src/routes/tasks.js'
import __dirname from "./src/database.js";
import path from "path"

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(taskRoutes);



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.get('/postea', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "postea.html"));
})


export default app;

