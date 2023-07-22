 

checkDuplicateUsernameOrEmail = (req, res, next) => {
 

  if (req.body.user_email) {
    
      if (req.body.user_email.length>0) {
        res.status(400).send({
          message: "Failed! email id can't be blank= " + req.body.user_email
        });
        return;
       
    }
  }


  next();
};
 

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
   
};

module.exports = verifySignUp;
