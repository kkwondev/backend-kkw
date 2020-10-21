const sql = require("./db.js");

UsersModel.findByEmail = (email, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${email}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };




module.exports = UsersModel;