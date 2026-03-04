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
import addressRouter from './Router/addressRoute.js'
import homeSliderRoute from "./Router/homeSliderRoute.js";
import bannerRoute from "./Router/BannerRoute.js";
import blogRoute from "./Router/BlogRoute.js";


const app = express();
const PORT = process.env.PORT || 7000;
// Middleware
app.use(cors( {
   origin: [ 
    // "http://localhost:5173", 
    "https://pawar-ecommerce-app.netlify.app" 
  ], credentials: true } ));


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
app.use('/api/address',addressRouter)
app.use('/api/homeSlider', homeSliderRoute)
app.use('/api/banner', bannerRoute)
app.use('/api/blog', blogRoute)

app.listen(PORT, () => {
  console.log(` Server running on  ${PORT}`);
});
