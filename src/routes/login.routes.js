module.exports = app => {
    const auth = require("../controllers/auth.js");

    app.post("/login", auth.login);


};