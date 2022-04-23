import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    url: {
      type: String,
      default: "#",
    },
    start_time: {
      type: String,
    },
    end_time: {
      type: String,
    },
    duration: {
      type: Number,
      default: 0,
    },
    site: {
      type: String,
      default: "Manual",
    },
    in_24_hours: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models?.Task || mongoose.model("Task", TaskSchema);

export default Task;
