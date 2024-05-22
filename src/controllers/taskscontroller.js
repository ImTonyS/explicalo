import { v4 } from "uuid";
import { getConnection } from "../database.js"

export const getTasks = (req, res) => {
    const db = getConnection();
    try{
        res.json(db.data.tasks);
    } catch(error) {
        return res.status(500).send(error)
    }
}
export const createTask = async (req, res) => {
    const newTask = {
        id: v4(),
        name: req.body.name,
        description: req.body.description
    }

    try {
        const db = getConnection();
        db.data.tasks.push(newTask);
        await db.write()

        res.json(newTask);
    } catch(error) {
        return res.status(500).send(error);
    }
}


export const getTask = (req, res) => {
    
        const db = getConnection();
        const task = db.data.tasks.find(task => task.id === req.params.id);
        if(!task) return res.sendStatus(404)
        res.json(task)

}
export const updateTask = (req, res) => {
    res.send("updating task");
}
export const deleteTask = (req, res) => {
    res.send("deleting task");
}
export const count = (req, res) => {
    res.send("counting tasks");
}