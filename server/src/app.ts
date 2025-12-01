import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db-connection";
import cors from "cors";

/**@Import_Routes */
import userRoute from './routes/user.route';
import userTodoRoute from './routes/user-todo.route';
import userTodoSubTask from './routes/user-todo-subtask.route';
import userNoteRoute from './routes/user-note.route';
import userBlogRoute from './routes/user-blog.route';
import donotTouchRoute from './routes/do-not-touch-route';
/** @dotEnv */
dotenv.config();

/**@express_calling */
const app = express();

/** @Database_Calling */
connectDB();

/** @ReceiveReq_JSON : Req.*values as json format */
app.use(express.json());

/** @CORS : Allow Backend API calling from other URLs */
const allowedOrigins = ["http://localhost:5173", "http://localhost:4173"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


/**@App_Routes */
app.use('/api/auth/user', userRoute);
app.use('/api/user/todo', userTodoRoute);
app.use('/api/user/note', userNoteRoute);
app.use('/api/user/blog', userBlogRoute);
app.use('/api/user/todo/subtask', userTodoSubTask);
app.use('/api/user/donot-touch', donotTouchRoute)
export default app;
