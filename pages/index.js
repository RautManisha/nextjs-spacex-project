import Head from "next/head";
import { getAllLaunchData } from "../lib/launches";
import Launch from "../components/launch";
import { useState, useEffect } from "react";

export async function getStaticProps() {
  const launches = await getAllLaunchData();
  return {
    props: {
      launches,
    },
  };
}

export default function Home({ launches }) {
  const [data, setData] = useState([]);
  const [sortKey, setSortKey] = useState("id");
  useEffect(() => {
    setData(launches);
  }, []);

  useEffect(() => {
    setData((data) => {
      const dataToSort = [...data];
      // console.log("datatosort: ", dataToSort);
      dataToSort.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) {
          return 1;
        } else if (a[sortKey] > b[sortKey]) {
          return -1;
        } else {
          return 0;
        }
      });
      return dataToSort;
    });
    // console.log(sortKey);
    // console.log(data);
  }, [sortKey]);

  return (
    <div>
      <Head>
        <title>Spacex Project</title>
      </Head>
      <label htmlFor="sortBy">Sort By </label>
      <select id="sortBy" onChange={(e) => setSortKey(e.target.value)}>
        <option value="id">Id</option>
        <option value="launch_date_local">Launch Date</option>
        <option value="mission_name">Mission Name</option>
      </select>
      <Launch launches={data} />
    </div>
  );
}
