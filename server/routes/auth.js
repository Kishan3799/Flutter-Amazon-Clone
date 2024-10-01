import { Router } from "express";
import { User } from "../models/user.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import auth from "../middleware/auth.js";
const authRouter = Router();


//SIGN UP ROUTE
authRouter.post("/api/signup", async (req, res) => {
    try {
        const {name, email, password} = req.body;
    
        const existingUser = await User.findOne({email});
    
        if(existingUser){
            return res.status(400).json({msg:"Email already exists"})
        }
        
        const hashedPassword = await bcryptjs.hash(password,8)

        let user = new User({
            email,
            password:hashedPassword,
            name,
        });
    
        user = await user.save();
    
        return res.json(user);
    } catch (e) {
        res.status(500).json({error:e.message});
    }
});

//SIGN IN ROUTE
authRouter.post("/api/signin",  async (req, res)=>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res
                .status(400)
                .json({msg:"User with this email is not exist!"});
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res
            .status(400)
            .json({msg:"Incorect password"});
        }

       const token = jwt.sign({id: user._id,}, process.env.ACCESS_TOKEN_SECRET);
       res.json({token, ...user._doc});


    } catch (e) {
        res.status(500).json({error :e.message})
    }

} );

//valid token api
authRouter.post("/api/tokenIsVaild", async (req, res)=>{
    try {
        const token = req.header('x-auth-token');
        if(!token) return res.json(false);
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if(!user) return res.json(false);
        res.json(true);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})


//get user data
authRouter.get('/', auth, async (req,res)=>{
    const user = await User.findById(req.user);
    res.json({...user._doc, token:req.token});
})

export default authRouter;