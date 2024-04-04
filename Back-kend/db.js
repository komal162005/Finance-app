const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGO_URL).then(
    ()=>{
        console.log('Connected');
    }
)
.catch((err)=>{
console.log('Failed '+err);
})

