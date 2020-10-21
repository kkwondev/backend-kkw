var _ = require('lodash');
const UsersModel = require("../models/UsersModel.js");

exports.login = (req, res) => {

    const reqEmail = req.body.email;
    const reqPassword = req.body.password;

    if(reqEmail === undefined || reqEmail === '') {
        res.status(400).json({
            message: "이메일을 입력해 주세요."
        });
        return;
    }

    if(reqPassword === undefined || reqPassword === '') {
        res.status(400).json({
            message: "패스워드를 입력해 주세요."
        });
        return;
    }

    UsersModel.checklogin({
        email: reqEmail,
        password: reqPassword
    }, (result) => {
        if (result.state === true) {
            if(result.data.length > 0) {
                res.status(200).json({
                    status: true,
                    message: "정상 처리 하였습니다.",
                    data: result.data[0]
                });
            } else {
                res.status(400).json({
                    status: false,
                    message: "데이터가 존재 하지 않습니다.",
                });

            }
        } else {
            console.debug(result);
            res.status(500).json({
                status: false,
                message: '에러가 발생 했습니다.'
            });
        };
    });

};
