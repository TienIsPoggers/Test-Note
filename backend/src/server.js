import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import dotenv from 'dotenv'
import cors from 'cors'
import { ConnectDB  } from './config/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000

ConnectDB();
app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json());
app.use('/api/notes',notesRoutes)
app.listen(PORT,() => console.log(`Server started at PORT ${PORT}`))