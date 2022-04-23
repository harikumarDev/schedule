import axios from "axios";
import Layout from "../components/Layout/Layout";
import HomePage from "../components/HomePage/HomePage";
import Task from "../models/Task";
import db from "../utils/db";
import { useEffect, useState } from "react";

const getTime = (utc) => {
  return new Date(utc).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
};

export const getServerSideProps = async (context) => {
  let { data } = await axios.get("https://kontests.net/api/v1/all");
  data = data.map((row) => ({
    ...row,
    start_time: getTime(row.start_time),
  }));
  return {
    props: {
      data: data.filter(
        (item) =>
          item.site === "CodeForces" ||
          item.site === "CodeChef" ||
          item.site === "Kick Start" ||
          item.site === "LeetCode"
      ),
    },
  };
};

export default function Home({ data }) {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("/api/getTasks");
      let { tasks } = data;
      tasks = tasks.map(db.convertDocToObj);
      setTasks(tasks);
    };

    getData();
  }, []);

  return (
    <Layout>
      {tasks ? <HomePage data={[...data, ...tasks]} /> : <h2>Loading...</h2>}
    </Layout>
  );
}
