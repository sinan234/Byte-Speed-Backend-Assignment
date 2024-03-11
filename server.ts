import express from 'express';
const db=require('./Database/dbconnection')
const identifyRouter=require('./routes/identifyRouter')
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());

const port = 3000;

app.use('/identify', identifyRouter)

app.get('/',(req,res)=>{
  res.send("hello")
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
db.connect() 