const db = require("../models"); 
const User = db.user;
const { Op } = require("sequelize");

var bcrypt = require("bcryptjs");




exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


 


exports.userslist = (req, res) => {
 
  const limit = req.query.size ? +req.query.size : 10;
   
  const offset = req.query.page ? (req.query.page-1) * limit : 0;
  const order = [];
  let where = {};
 
  if(req.query.ordering){
if(req.query.ordering.includes('-')){
  order.push( [req.query.ordering.replace('-',''), 'ASC'])
}else{
  order.push( [req.query.ordering, 'DESC'])
}
   

  } 


if(req.query.search){

  where={
    [Op.and]: [ 
      { "username": { [Op.like]: '%' + req.query.search + '%' }},
      { "email": { [Op.like]: '%' + req.query.search + '%' }}
    ]
  }
   
}
  



   
  // User.findAll({
  //   where: {}, 
  //   attributes: { exclude: ['id','password'] },
  //   offset: offset, 
  //   limit: res.size
  // })
 
  User.findAndCountAll({
    attributes: { exclude: ['password'] },
    offset: offset, 
    limit: limit,
    order: order,
    where:   where
   // where: { title: { [Op.like]: `%js%` } }, // conditions
  }).then(data => {   
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}


// Delete a Tutorial with the specified id in the request
exports.userDelete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};


// Update a Tutorial by the id in the request
exports.userUpdate = (req, res) => {
  const id = req.params.id;

  User.update({ username: req.body.username,email: req.body.email,password:  bcrypt.hashSync(req.body.password, 8) }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

