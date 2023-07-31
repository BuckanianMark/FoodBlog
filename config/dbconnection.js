const mongoose = require('mongoose')
const  MONGO_URI = 'mongodb+srv://barns:barns@cluster0.5k9j8wn.mongodb.net/FoodBlog?retryWrites=true&w=majority'



const connectDb = async()=>{
    try {
     const conn = await mongoose.connect(MONGO_URI)
     console.log(`DB connected : ${conn.connection.host}`)
    } catch (error) {
     console.log('db not connected',error)
    } 
 }
 module.exports = connectDb