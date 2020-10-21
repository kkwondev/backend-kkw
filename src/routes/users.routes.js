module.exports = app => {
    const users = require("../controllers/users.js");

    app.post("/users", users.create);
    app.delete("/users/:user_id", users.delete);


};