import express from "express";
import authRouter from "./routes/auth.js"
import adminRouter from "./routes/admin.js";
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config({
  path:"./.env"
})

const PORT = process.env.PORT || 3000;
const app = express();


//middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

connectDB()
  .then(()=> {
    app.listen(PORT, '0.0.0.0', ()=>{
      console.log(`☻ Server is running port: ${PORT}`);
    })
  })
  .catch((err)=>{
    console.log("MONGODB CONNECTION IS FAILED!!!", err);
  })
