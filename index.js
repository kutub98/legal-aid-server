const express = require('express');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5001;

//use of MiddleWare 
app.use(cors());
app.use(express.json())
require('dotenv').config();


app.get('/', (req, res)=>{
    res.send('legal aid is ready to run')
})


console.log(process.env.SECRET_KEY_OF_lEGAL_AID)
console.log(process.env.SITE_NAME_IS_lEGAl_AID)




app.listen(port ,(req, res)=>{
    console.log(`Legal aid service has been started ${port}`)
})