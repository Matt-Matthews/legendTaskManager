import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
  taskId: {
    type: String,
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
    default: null,
  },
  userId: {
    type: String,
    required: false,
    default: null,
  },
  teamId: {
    type: String,
    required: false,
    default: null,
  },
});

export default mongoose.model('Task', TaskSchema);