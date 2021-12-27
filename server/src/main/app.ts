import express from 'express';
import cors from 'cors';

const app = express();

export async function initializeApp() {
  const { default: loginRoutes } = await import('./routes/login');
  const { default: signupRoutes } = await import('./routes/signup');
  const { default: teacherRoutes } = await import('./routes/teachers');

  app.use(cors());
  app.use(express.json());
  app.use(loginRoutes);
  app.use(signupRoutes);
  app.use(teacherRoutes);
}

export default app;
