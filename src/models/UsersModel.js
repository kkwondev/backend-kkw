const sql = require("./db.js");

const Users = function(users) {
    this.email = users.email;
    this.name = users.name;
};

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

Users.findByEmail = (email, result) => {
    sql.query(`SELECT * FROM users WHERE email = '${email}' `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result({
                state: false,
                error: err
            });
            return;
        }
        result({
            state: true,
            data: res
        });
        return;
    });
};


Users.create = (userData, result) => {

    const newUUID = uuidv4();

    sql.query(`INSERT INTO users
    (user_uuid, user_level, email, name, nickname, password, active, created_at, updated_at)
    VALUES('${newUUID}', '000', '${userData.email}', '${userData.name}', '${userData.nickname}', '${userData.password}', 'Y', now(), now())`, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result({
                state: false,
                error: err
            });
            return;
        }

        result({
            state: true,
            data: res
        });
    });
};


Users.checklogin = (loginData, result) => {

    sql.query(`SELECT * FROM users WHERE email = '${loginData.email}' and password = '${loginData.password}' limit 0,1 `, (err, res) => {
        if (err) {
            result({
                state: false,
                error: err
            });
            return;
        }
        result({
            state: true,
            data: res
        });
        return;
    });
};


Users.delete = (data, result) => {

   sql.query(`DELETE FROM users WHERE id = '${data.user_id}' `, (err, res) => {
        if (err) {
            result({
                state: false,
                error: err
            });
            return;
        }

        result({
            state: true,
            data: res
        });
        return;
   });
};

module.exports = Users;