import Head from "next/head";
import { getAllLaunchData } from "../lib/launches";
import Launch from "../components/launch";
import React, { useEffect, useState, useRef } from "react";
import { sortData, sortOptions } from "../lib/utility-functions";
import Dropdown from "../components/dropdown";

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
  const [sortKey, setSortKey] = useState("default");
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

  useEffect(
    (e) => {
      setData((data) => {
        return sortData(data, sortKey);
      });
    },
    [sortKey]
  );

  useEffect(() => {
    const fetchData = async () => {
      const moreLaunches = await getAllLaunchData(data.length);
      if (moreLaunches) {
        setData([...data, ...moreLaunches]);
        // setData((data) => {
        //   return sortData(data, sortKey);
        // });
      } else {
        setDone(true);
      }
    };
    fetchData();
  }, [page]);

  return (
    <div className="bg-fuchsia-50">
      <div className="container center ">
        <Head>
          <title>Spacex Project</title>
        </Head>
        <div className="grid grid-cols-2 gap-4">
          <Dropdown
            callback={setSortKey}
            label="Sort By"
            id="sortBy"
            list={sortOptions}
          />
        </div>
        <Launch launches={data} />
        {!done ? (
          <div className="loading" ref={loader}>
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
