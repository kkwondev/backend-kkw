var _ = require('lodash');
const UsersModel = require("../models/UsersModel.js");

exports.create = (req, res) => {

    const reqEmail = req.body.email;
    const reqName = req.body.name;
    const reqNickName = req.body.nickname;
    const reqPassword = req.body.password;

    if(reqEmail === undefined || reqEmail === '') {
        res.status(400).json({
            message: "이메일을 입력해 주세요."
        });
        return;
    }

    if(reqName === undefined || reqName === '') {
        res.status(400).json({
            message: "이름을 입력해 주세요."
        });
        return;
    }

    if(reqNickName === undefined || reqNickName === '') {
        res.status(400).json({
            message: "닉네임을 입력해 주세요."
        });
        return;
    }

    if(reqPassword === undefined || reqPassword === '') {
        res.status(400).json({
            message: "패스워드를 입력해 주세요."
        });
        return;
    }

    UsersModel.findByEmail(reqEmail, (result) => {
        if (result.state === true) {
            if(result.data.length > 0) {
                res.status(400).json({
                    status: false,
                    message: "존재 하는 이메일 주소 입니다."
                });
            } else {

                UsersModel.create({
                    email: reqEmail,
                    name: reqName,
                    nickname: reqNickName,
                    password: reqPassword
                }, (result) => {
                    if (result.state === true) {
                        const insertid = result.data.insertId;
                        res.status(200).json({
                            status: true,
                            message: '정상 처리 하였습니다.',
                            data: {
                                id: insertid
                            }
                        });

                    } else {
                        console.debug(result);
                        res.status(500).json({
                            status: false,
                            message: '에러가 발생 했습니다.'
                        });
                    };
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

exports.delete = (req, res) => {
    UsersModel.delete({
        user_id : req.params.user_id
    }, (result) => {
        if (result.state === true) {
            res.status(200).json({
                status: true,
                message: '정상 처리 하였습니다.'
            });
        } else {
            console.debug(result);
            res.status(500).json({
                status: false,
                message: '에러가 발생 했습니다.'
            });
        };
    });
};
