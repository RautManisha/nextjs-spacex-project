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
  const [isFetching, setIsFetching] = useState(false);
  const [done, setDone] = useState(false);
  // const done = false;
  useEffect(() => {
    // const fetchData = async () => {
    //   const launches = await getAllLaunchData();
    //   setData(launches);
    // };
    // fetchData();
    setData(launches);
    window.addEventListener("scroll", handleScroll);
    console.log("mounted!!!!!!");
    setDone(false);

    return () => window.removeEventListener("scroll", handleScroll);
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

  useEffect(() => {
    if (!isFetching) return;
    const fetchMoreListItems = async () => {
      console.log("fetch fetch fetch");
      const moreLaunches = await getAllLaunchData(data.length);
      if (moreLaunches) {
        setData([...data, ...moreLaunches]);
      } else {
        console.log("Done fetching!!!!!!!!!");
        setDone(true);
      }
      setIsFetching(false);
    };
    console.log("done? ", done);
    if (!done) fetchMoreListItems();
  }, [isFetching]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 <=
      document.documentElement.offsetHeight
    )
      return;
    // console.log("Fetch more list items!");
    if (!done) {
      setIsFetching(true);
    }
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
      {/* {console.log(`is fetching ${isFetching}, complete ${isFetchingComplete}`)} */}
      {isFetching && !done && <h2>Fetching..</h2>}
    </div>
  );
}
