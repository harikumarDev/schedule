import db from "../../utils/db";
import Task from "../../models/Task";

export default async function handler(req, res) {
  const { name, start_time, end_time, duration } = req.body;
  await db.connect();
  const task = new Task({
    name,
    start_time,
    end_time,
    duration,
  });
  await task.save();
  await db.disconnect();
  res.status(200).json({ success: true, task });
}
