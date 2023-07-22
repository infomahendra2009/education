const express = require("express");
const cors = require("cors");

const app = express();
cors();
// var corsOptions = {
//   origin: "http://localhost:3000"
// };

const   fs = require('fs') ;
const  bodyParser = require("body-parser");
const auth = require('./app/routes/auth.routes');
const wordpower = require('./app/routes/wordpower.routes');
 
// Swagger --------------------------------
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}

 

 // simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to  the application." });
}); 
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));
 



// routes
//require('./app/routes/auth.routes')(app);  
//app.use('/api/user', auth, cache(10));
app.use('/api/user', auth); 
app.use('/api/wordpower', wordpower); 
 


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//console.log('http://localhost:8080/api/user/signup')
console.log('Running port http://localhost:8080 from ' + corsOptions.origin)
 