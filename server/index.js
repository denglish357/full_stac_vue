const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');




const app = express();

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());



//BRING IN ROUTES
const posts = require('./routes/api/posts');

app.use('/api/posts',posts)
// HANDLE PRODUCTION
if (process.env.NODE_ENV === "production"){
  // SET STATIC FOLDER
  app.use(express.static(__dirname + '/dist/'))
  
  // HANDLE SPA
  app.get(/.*/, (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
  })
}


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server started on port ${ port }`)
})