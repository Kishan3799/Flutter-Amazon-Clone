import express from "express";
import authRouter from "./routes/auth.js"
import mongoose from "mongoose";
import { DB } from "./constant.js";
import adminRouter from "./routes/admin.js";
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";

const PORT = 3000;
const app = express();



//middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

mongoose.connect(DB).then(()=>{
  console.log("Connection is successfully");
})
.catch((e)=>{
  console.log(e);
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
