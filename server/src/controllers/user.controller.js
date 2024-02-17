import {createUser, handleLogin} from '../models/user.model.js';

const httpCreateUser = async (req, res) => {

    const message = await createUser(req.body);

    return res.status(201).json({
        message
    });
}
const httpHandleLogin = async (req, res) => {
    const message = await handleLogin(req.body);

    return res.status(200).json({
        message
    });
}

const httpHandleLogout = async (req, res) => {

}
export {
    httpCreateUser,
    httpHandleLogin,
    httpHandleLogout
}