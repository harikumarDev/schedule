import db from "../../utils/db";
import Task from "../../models/Task";

export default async function handler(req, res) {
  await db.connect();
  const tasks = await Task.find({}).lean();
  await db.disconnect();
  res.status(200).json({ success: true, tasks });
}
