import mongoose from 'mongoose'


const connectdb=  async(DATABASE_URL)=>{
    try{
        await mongoose.connect(DATABASE_URL);
        console.log(" connected succesfully with mongodb")
    }
    catch(err){
        console.log(err)
    }
    
    
    }
    
export default connectdb;


