// require database
const mongoose = require("mongoose")
mongoose.set("strictQuery",false)
//connect to database
mongoose.connect("mongodb://127.0.0.1:27017/MERAKI_Academy_Project_4")
   .then(()=>{
    console.log("CONNECTED TO DATABASE")
   })
   .catch((error)=>{
   console.log(error)
})

// require it in server