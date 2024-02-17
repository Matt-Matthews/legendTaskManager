
import mongoose from "mongoose";
import {ATLAS_URI} from '../config/configs.js'

const connect = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(ATLAS_URI);
    console.log("Connected to the database");
  } catch (e) {
    console.log(e.message);
  }
};

export default connect;
