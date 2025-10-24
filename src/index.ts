import express from 'express';
import cors from 'cors'; 
import { AppRoutes } from './routes/routes.js';
import cookieParser from 'cookie-parser'
const app = express();

const PORT = process.env.PORT;
app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());
app.use(AppRoutes.routes);

app.listen(PORT,() => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})