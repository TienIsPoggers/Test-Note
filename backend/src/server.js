import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { ConnectDB  } from './config/db.js';
dotenv.config();
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5000
ConnectDB();
if(process.env.NODE_ENV !== 'production'){
    app.use(cors({
        origin:"http://localhost:5173"
    }));
}    
app.use(express.json());
app.use('/api/notes',notesRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("/",(req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
    console.log(path.join(__dirname,"../frontend/dist"))
}


app.listen(PORT,() => console.log(`Server started at PORT ${PORT}`))