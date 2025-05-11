const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://atanutechstore:atanutech2025@testdb.pjkjmst.mongodb.net/?retryWrites=true&w=majority&appName=testdb")
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