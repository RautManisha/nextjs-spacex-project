import Head from "next/head";
import { getAllLaunchData } from "../lib/launches";
import Launch from "../components/launch";
import React, { useEffect, useState, useRef } from "react";
import { sortData } from "../lib/utility-functions";

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
  const [done, setDone] = useState(false);
  const loader = useRef(null);
  const [page, setPage] = useState(1);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((_page) => _page + 1);
    }
  };

  useEffect(() => {
    setData(launches);
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    setData((data) => {
      return sortData(data);
    });
  }, [sortKey]);

  useEffect(() => {
    const fetchData = async () => {
      const moreLaunches = await getAllLaunchData(data.length);
      if (moreLaunches) {
        setData([...data, ...moreLaunches]);
        setData((data) => {
          return sortData(data, sortKey);
        });
      } else {
        setDone(true);
      }
    };
    fetchData();
  }, [page]);

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
      {console.log("done? ", done)}
      {!done ? (
        <div className="loading" ref={loader}>
          <h2>Loading...</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
