import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from './routes/categoryRoutes.js';
import cors from 'cors';
import { orders, verify } from './middlewares/pay.js';
import path from 'path';
import {fileURLToPath} from "url";

dotenv.config();
 
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product', productRoutes)
app.get('/rt',console.log("HI"));
app.post('/orders',orders);
app.post('/verify',verify)

app.get('*',function(req,res){
res.sendFile(path.join(__dirname, "./client/build/index.html"));
})
const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>{
    console.log(`server running on ${PORT} in ${process.env.DEV_MODE}`.bgCyan.white);
});
