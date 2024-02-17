import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '../config/configs.js';

const createJwt = (user) => {
    try{
        return jwt.sign(user, SECRET_KEY, {expiresIn: '24h'});
    }catch(err){
        return err.message;
    }
}

const verifyToken = (authHeader) => {
    try{
        const token = authHeader.split(" ")[1];

        if (!token) return 'provide token';

        return jwt.verify(token, SECRET_KEY);
    }catch(err){
        return err.message;
    }
}

export {
    createJwt,
    verifyToken,
}