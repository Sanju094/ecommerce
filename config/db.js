import mongoose from 'mongoose';
import colors from 'colors';
const connetDB =async() => {
    try{
const conn = await mongoose.connect(process.env.MONGO_URI)
console.log('Connected');
    }catch(error)
    {
        console.log(`Error ${error}`.bgRed.White)
    }
}
export default connetDB;