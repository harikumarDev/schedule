import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
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
    type: String,
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
});

const Event = mongoose.model.Event || mongoose.model("Event", EventSchema);

export default Event;
