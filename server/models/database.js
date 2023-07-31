const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true , useUnifiedTopology:true })

const db = mongoose.connection;

db.on("error", console.error.bind(console, 'connection error'))

db.once('open', function (){
    console.log("Db connected successfully")
})

// const connect = async()=>{
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true , useUnifiedTopology:true })
//         console.log(`DB connected : ${conn.connection.host}`)
//     } catch (error) {
//         console.log(error)
//     }
// }

// models

// module.exports = connect