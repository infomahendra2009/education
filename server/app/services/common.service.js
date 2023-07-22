const service = {}; 
service.callOutput = (error, result) => {
  let output={
    resultCode:0
  }
 
    
    if (error) {
       
        output['message']=error;
    
      }  else if (
          result[0] &&
          result[0] != "" &&
          result[0] !== undefined
        )  {
              output.resultCode=1;
              output['data']=result[0];
          
         }   else {
              output['data']=[];
              output['message']="Record Not Found!! Please Contact Admin";
        
       
      }
      return output;
}

service.callError = (message="") => { 
      return {
        resultCode:0,
        message:message
      };
}


module.exports=service;