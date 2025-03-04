const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const db = require('../models/index');
const { where } = require('sequelize');
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExit = await checkUserEmail(email);
            if (isExit) {
                let user = await db.User.findOne({
                    where: { email: email }
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Succeeded!';
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password!';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "User is not exist";
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = "Your' Email isn't exist.";
            }
            resolve(userData);
        }
        catch (e) {
            reject(e);
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let hashPassword = (password) => {
    return new Promise(async (resovle, reject) => {
        try {
            const hash = await bcrypt.hashSync(password, salt);
            resovle(hash);
        } catch (e) {
            reject(e);
        };
    })
}
module.exports = {
    hashPassword, handleUserLogin
}