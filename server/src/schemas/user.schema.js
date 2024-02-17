import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: false,
    default: 'Standard'
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  teamId: {
    type: Array,
    required: false,
    default: ['default'],
  },
});

export default mongoose.model('User', UserSchema);