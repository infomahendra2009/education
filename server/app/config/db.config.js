module.exports = {
  "host":"localhost",
  "user":"root",
  "password":"root123",
  "database":"education",
  "dialect": "mysql",
  "connectionLimit":50,
  "connectTimeout":30000,
  "acquireTimeout":3600000,
  "timeout":3600000, 
  "multipleStatements":true,
  "pool": {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
