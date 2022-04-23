import axios from "axios";
import Layout from "../components/Layout/Layout";
import HomePage from "../components/HomePage/HomePage";
import db from "../utils/db";
import Task from "../models/Task";

const getTime = (utc) => {
  return new Date(utc).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
};

export const getStaticProps = async (context) => {
  let { data } = await axios.get("https://kontests.net/api/v1/all");
  data = data.map((row) => ({
    ...row,
    start_time: getTime(row.start_time),
    end_time: getTime(row.end_time),
  }));

  let tasks;
  try {
    await db.connect();
    tasks = await Task.find({}).lean();
    await db.disconnect();
    tasks = tasks.map(db.convertDocToObj);
  } catch (err) {
    console.log(err);
  }

  return {
    revalidate: 10,
    props: {
      data: [
        ...data.filter(
          (item) =>
            item.site === "CodeForces" ||
            item.site === "CodeChef" ||
            item.site === "Kick Start" ||
            item.site === "LeetCode"
        ),
        ...tasks,
      ],
    },
  };
};

export default function Home({ data }) {
  return (
    <Layout>
      <HomePage data={data} />
    </Layout>
  );
}
