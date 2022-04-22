import mongoose from "mongoose";

const connection = {};

const connect = async () => {
  if (connection.isConnected) {
    console.log("====================================");
    console.log("Already connected");
    console.log("====================================");
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected) {
      console.log("====================================");
      console.log("Used previous connection");
      console.log("====================================");
      return;
    }
    await mongoose.disconnect();
  }

  await mongoose
    .connect(process.env.MONGO_URI)
    .then((db) => {
      console.log("====================================");
      console.log("DB connected successfully - New connection");
      console.log("====================================");
      connection.isConnected = db.connections[0].readyState;
    })
    .catch((err) => {
      console.log("====================================");
      console.log("DB connection failed");
      console.log(err);
      console.log("====================================");
      process.exit(1);
    });
};

const disconnect = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      console.log("====================================");
      console.log("DB disconnected successfully");
      console.log("====================================");
    } else {
      console.log("====================================");
      console.log("DB not Disconnected (Dev Mode)");
      console.log("====================================");
    }
  }
};

const getTime = (utc) => {
  return new Date(utc).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
};

const convertDocToObj = (doc) => {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  doc.start_time = getTime(doc.start_time);

  return doc;
};

const db = { connect, disconnect, convertDocToObj };

export default db;
