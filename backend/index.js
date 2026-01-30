import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/connectDb.js";
import userRouter from './Router/userRoute.js'
import catRouter from './Router/catRoute.js'
import productRouter from './Router/productRoute.js'
import cartProductRouter from './Router/cartProductRoute.js'
import myListRouter from './Router/myListRoute.js'


const app = express();
const PORT = process.env.PORT || 7000;

// CORS (must be BEFORE routes)
const allowedOrigins = [
  "http://localhost:5173",
  "https://pawar-ecommerce-app.netlify.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "CORS policy does not allow this origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// Allow preflight requests for all routes
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({
  crossOriginResourcePolicy: false
}));

connectDB();

// app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: `Server is running on port ${PORT}` });
});

app.use('/api/user',userRouter)
app.use('/api/category',catRouter)
app.use('/api/product',productRouter)
app.use('/api/cartProduct',cartProductRouter)
app.use('/api/myList',myListRouter)

app.listen(PORT, () => {
  console.log(` Server running on  ${PORT}`);
});
