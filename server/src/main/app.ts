import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

export async function initializeApp() {
  const { default: loginRoutes } = await import('./routes/login');
  const { default: signupRoutes } = await import('./routes/signup');
  const { default: teacherRoutes } = await import('./routes/teachers');

  app.use(cors());
  if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'));
  }
  app.use(express.json());
  app.use(loginRoutes);
  app.use(signupRoutes);
  app.use(teacherRoutes);
}

export default app;
