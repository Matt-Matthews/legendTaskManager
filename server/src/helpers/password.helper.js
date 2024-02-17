import bcrypt from "bcrypt";
import { SALT_ROUND } from "../config/configs.js";

const handlePasswordHash = async (password) => {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUND);
      const passwordHash = await bcrypt.hash(password, salt);
      return passwordHash;
    } catch (err) {
      console.log(err.message);
    }
}

const validatePassword = async (passwordHash, password) => {
    return await bcrypt.compare(password, passwordHash);
}

export {
    handlePasswordHash,
    validatePassword
}