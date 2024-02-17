import User from "../schemas/user.schema.js";
import {handlePasswordHash, validatePassword} from '../helpers/password.helper.js'
import {createJwt, verifyToken} from '../helpers/jwt.helper.js';

const createUser = async (user) => {
  try {
    const userExist = await  User.findOne({email: user.email}).exec(); //check if the user with same email exist
    if(userExist) return 'user exist';

    const password = await handlePasswordHash(user.password); //hash the password
    const userData = await User({
      ...user,
      password,
    });
    await userData.save();
    return "success"; //return a message
  } catch (err) {
    return err.message;
  }
};

const handleLogin = async ({email, password}) => {
    try{
        const user = await  User.findOne({email}).exec();

        if(!user) return 'user not found'; //return a message if user does not exist

        const {password: userPassword, firstName, id, lastName, email: userEmail, contact} = user;

        const isPasswordMatch = await validatePassword(userPassword, password); //compares the password with the hashed password from database
        if(isPasswordMatch){
            
            return createJwt({id, firstName, lastName, email: userEmail, contact}); //returns a json token is password is correct
        }

        return 'wrong password';

    }catch(err){
        console.log(err);
        return err.message;
    }
}


export { createUser, handleLogin };
