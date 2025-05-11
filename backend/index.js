const express=require('express')
const app=express()
const connectDB=require('./db/db')
const cors=require("cors")
connectDB();

app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true,               // if you need cookies or sessions
}));
// app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use("/api/users",require('./routes/userRoutes'))

app.listen(3000,()=>{
    console.log(`Backend server is running on PORT 3000`)
})