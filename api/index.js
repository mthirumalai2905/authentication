import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import cors from 'cors';
import jwt from 'jsonwebtoken';

const secret = 'secret123'

const app = express();

app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// Replace the connection string with your MongoDB URI
await mongoose.connect('mongodb+srv://mthirumalai2905:HM3DT8GWA2N2HaoZ@cluster0.jcnfxlr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('ok');
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        console.log('User registering:', { email, password: hashedPassword });
        const user = new User({ password: hashedPassword, email });
        await user.save().then(userInfo => {
          jwt.sign({id: userInfo._id,email:userInfo.email}, secret, (err, token) =>{
            if(err){
                console.log(err);
                res.sendStatus(500);
            } else {
                res.cookie('token', token).json({id:userInfo._id, email:userInfo.email});
            }
          })
        });
        console.log('User registered:', user);
        res.send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
