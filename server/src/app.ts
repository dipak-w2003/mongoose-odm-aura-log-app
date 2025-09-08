import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db-connection";
import cors from "cors";

// ROUTES
import userRoute from './routes/user.route';
import userTodoRoute from './routes/user-todo.route';
import userTodoSubTask from './routes/user-todo-subtask.route';
import userNoteRoute from './routes/user-note.route';
import userBlogRoute from './routes/user-blog.route';

dotenv.config();

// express calling
const app = express();

/** @Database_Calling */
connectDB();

/** @Receive Req.*values as json format */
app.use(express.json());

/** @CORS: Allow Backend API calling from other URLs */
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Routes
app.use('/api/auth/user', userRoute);
app.use('/api/user/todo', userTodoRoute);
app.use('/api/user/note', userNoteRoute);
app.use('/api/user/blog', userBlogRoute);
app.use('/api/user/todo/subtask', userTodoSubTask);

export default app;
