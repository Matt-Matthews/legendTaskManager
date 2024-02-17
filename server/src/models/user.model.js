import User from "../schemas/user.schema.js";
import { v4 as uuid } from "uuid";
import {handlePasswordHash, validatePassword} from '../helpers/password.helper.js'
import {createJwt, verifyToken} from '../helpers/jwt.helper.js';

const createUser = async (user) => {
  try {
    const userExist = await  User.findOne({email: user.email}).exec();
    if(userExist) return 'user exist';

    const password = await handlePasswordHash(user.password);
    const userData = await User({
      ...user,
      password,
      id: uuid(),
    });
    await userData.save();
    return "success";
  } catch (err) {
    return err.message;
  }
};

const handleLogin = async ({email, password}) => {
    try{
        const user = await  User.findOne({email}).exec();
        console.log(user);
        if(!user) return 'user not found';

        const {password: userPassword, firstName, id, lastName, email: userEmail, contact} = user;

        const isPasswordMatch = await validatePassword(userPassword, password);
        if(isPasswordMatch){
            
            return createJwt({id, firstName, lastName, email: userEmail, contact});
        }

        return 'wrong password';

    }catch(err){
        console.log(err);
        return err.message;
    }
}


export { createUser, handleLogin };
