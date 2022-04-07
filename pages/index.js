import Head from "next/head";
import { getAllLaunchData } from "../lib/launches";
import Launch from "../components/launch";
import { useState, useEffect } from "react";
import useInfiniteScroll from "../components/useInfiniteScroll.js";

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
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [done, setDone] = useState(false);
  useEffect(() => {
    setData(launches);
  }, []);

  useEffect(() => {
    setData((data) => {
      const dataToSort = [...data];
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
  }, [sortKey]);

  function fetchMoreListItems() {
    const fetchData = async () => {
      const moreLaunches = await getAllLaunchData(data.length);
      if (moreLaunches) {
        setData([...data, ...moreLaunches]);
      } else {
        // console.log("Done fetching!!!!!!!!!");
        setDone(true);
      }
      setIsFetching(false);
    };
    if (!done) fetchData();
  }

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
      {isFetching && !done && <h2>Fetching..</h2>}
    </div>
  );
}
