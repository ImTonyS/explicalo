import { Router } from "express";
import { showPosts, count, createTask, deleteTask, getPost, getTasks, updateTask } from "../controllers/taskscontroller.js";

const router = Router();

router.get('/tasks', getTasks);
router.get('/tasks/count', count);
router.get('/post/:id', getPost);
router.post('/post', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

router.get('/posts', showPosts)

export default router;