const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("MongoDB connected successfully.");
    }catch(err){
        connectDBLocally();
        console.error("MongoDB connection failed : ",err);
        process.exit(1);
    }
}
const connectDBLocally=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/atanutechstore")
        console.log("MongoDB locally connected  successfully.");
    }catch(err){
        console.error("MongoDB connection failed : ",err);
        process.exit(1);
    }
}
module.exports=connectDB;