import mongoose from 'mongoose'

export const ConnectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Succuess to connect to DB");
    }catch(err){
        console.error("Error Connecting to DB: ",err)
        process.exit(1)
    }
}