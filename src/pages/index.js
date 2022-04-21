import axios from "axios";
import Layout from "../components/Layout/Layout";
import HomePage from "../components/HomePage/HomePage";

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
  }));

  return {
    revalidate: 1000,
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
  return (
    <Layout>
      <HomePage data={data} />
    </Layout>
  );
}
