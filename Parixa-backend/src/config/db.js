import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect('mongodb+srv://niteshkumaryadav8687:OJaSl4Y0WbTvAs5X@cluster0.rksjodg.mongodb.net/mcq_db?retryWrites=true&w=majority&appName=Cluster0')

        console.log(`MonogoDb Connected:  ${conn.connection.host}`)
    } catch (error) {
       console.log("MongoDB Connection failed:", error)
       process.exit(1); 
    }
}

export default connectDB;