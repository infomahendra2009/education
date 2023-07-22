const express = require("express");
const router = express.Router(); 
const con = require("../models/db"); 
const service = require("../services/common.service"); 
  
 
router.post(
    "/create",
    (req, res) => {    
    
       var params = req.body; 
        if(params.name   ){    
          try {   
            let arr= params.name.split(',');
            arr.forEach((d,i) => { 
              con.query( "call wordpower(?,?)", [d,d.length],function (error, result) {
             
              if(i==arr.length-1){
                res.json(service.callOutput(error, result))  
              }      
              });
            })
           


       

        } catch (e) { 
          res.json(service.callError(e))  
        }
        }else{
          res.json(service.callError("Username and password are required"))  
        }
     
    }
  )
 
  module.exports = router;