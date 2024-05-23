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


export const updateTask = async (req, res) => {
    const db = getConnection();
    const taskFound = db.data.tasks.find(task => task.id === req.params.id);
    if (!taskFound) return res.sendStatus(500);

    taskFound.name = req.body.name;
    taskFound.description = req.body.description;

    db.data.tasks.map(task => task.id === req.params.id ? taskFound : task);

    await db.write()

    res.json(`Task: ${taskFound.id} has been replaced`)
}   


export const deleteTask = async (req, res) => {
    const db = getConnection();
    const task = db.data.tasks.find(task => task.id === req.params.id);
    if(!task) return res.sendStatus(404);

    const newTask = db.data.tasks.filter(task => task.id !== req.params.id);
    db.data.tasks = newTask;
    
    await db.write();

    res.json(`Task ${task.id} ha sido eliminado`)

}
export const count = (req, res) => {
    const db = getConnection();
    const array = db.data.tasks.length;
    res.json(array)
}