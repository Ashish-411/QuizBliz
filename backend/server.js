require("dotenv").config();
const express = require("express");
const connectDB = require("./database/connection");
const cors = require("cors");

//express setup
const app = express();

//enable cors
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
//call the database
connectDB();

//api end points
app.get("/", (req,res) =>{
    res.send("Quiz APP backend is running");
});
//seperating routers
app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/quiz",require("./routes/quizRoutes"));

//server start
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
});