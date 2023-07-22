const express = require("express");
const router = express.Router();
  
//const bodyParser = require("body-parser");
//const path = require("path");
//const http = require("http"); 
//const fs = require('fs');
  
 const con = require("./../models/db"); 
 const service = require("./../services/common.service"); 
 
 
/*     router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next(); 
    [
      //verifySignUp.checkDuplicateUsernameOrEmail,      
    ]
  })  */

    

 
  router.post(
    "/signup",
    (req, res) => { 
       var params = req.body; 
        if(params.user_login && params.user_pass){
          try {   
         // con.query("INSERT INTO users SET ?", params, function(error, result, fields){
          con.query( "call UserSignUp(?,?,?,?)", [
            params.user_login,
            params.user_pass,
            params.user_email,
            params.user_nicename
          ],function (error, result) { 
            res.json(service.callOutput(error, result))        
          });

        } catch (e) { 
          res.json(service.callError(e))  
        }
        }else{
          res.json(service.callError("Username and password are required"))  
        }
      
    }
  )



  router.post(
    "/signin",
    (req, res) => {    
    

       var params = req.body; 
        if(params.username && params.password ){   
          try {       
          con.query( "call UserSignIn(?,?)", [params.username,params.password],function (error, result) {
            res.json(service.callOutput(error, result))        
          });

        } catch (e) { 
          res.json(service.callError(e))  
        }
        }else{
          res.json(service.callError("Username and password are required"))  
        }
     
    }
  )


  /* 
  router.get("/all/", function (request, response) {

    // query
    con.query("SELECT * FROM education.users", function(error, results, fields){

          if(error){
              throw error;
          }else{
              response.json(results);
              //console.log(fields);
          } 
    });
});

router.get("/all/:id", function(request, response){

  var userID = request.params.id;

  // query
  con.query("SELECT * from users WHERE user_id = ?", [userID], function(error, results, fields){

      if(error){
          throw error;
      }else{
          response.json(results);
      }
  });
});   */
 
/* 
// insert data api method - post
app.post("/user", function(request, response){

  //console.log(request.body);return false;

  //var name = request.body.name;
  //var email = request.body.email;
  //var phone_no = request.body.phone_no;

  //connection.query("INSERT INTO tbl_users (name, email, phone_no) values (?, ?, ?)", [name, email, phone_no], function(error, result, fields){

  var params = request.body;

  connection.query("INSERT INTO tbl_users SET ?", params, function(error, result, fields){

      response.json({
          status: 1,
          message: "Data inserted successfully",
          data: result,
          insert_id: result.insertId
      });
  });
}); */


    

  //router.post("/api/auth/signin", controller.signin);
  //router.post("/api/auth/refreshtoken", controller.refreshToken);
  module.exports = router;