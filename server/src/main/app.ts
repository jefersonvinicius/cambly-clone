import express, { Router } from 'express';
import cors from 'cors';
import loginRoutes from './routes/login';
import signupRoutes from './routes/signup';
import teacherRoutes from './routes/teachers';

const app = express();

app.use(cors());
app.use(express.json());
app.use(loginRoutes);
app.use(signupRoutes);
app.use(teacherRoutes);

export { app };
