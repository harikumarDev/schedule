export const getTime = (contestTime) => {
  // Time => 4/10/2022, 4:00:00 PM
  const time = contestTime.split(",")[1]; // " 4:00:00 PM"
  const timeArray = time.split(" "); // [" ", "4:00:00", "PM"]
  const arr1 = timeArray[1].split(":"); // ["4", "00", "00"]
  const timeString = arr1[0] + ":" + arr1[1] + " " + timeArray[2];

  return timeString;
};

export const getTime2 = (contestTime) => {
  // Time => 4/10/2022, 4:00:00 PM
  const time = contestTime.split(":");
  return time[0] + ":" + time[1] + " " + time[2].split(" ")[1];
};

export const getLocalTime = (time) => {
  const date = time ? new Date(time) : new Date();
  return date.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
};

export const ISTToUTC = (time) => {
  const date = new Date(time);
  return date.toISOString();
};

export const timeDiff = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  console.log("ST NF EN", start, end);
  const diff = end.getTime() - start.getTime();

  return diff / 1000;
};
