import Head from "next/head";
import { getAllLaunchData } from "../lib/launches";
import Launch from "../components/launch";

export async function getStaticProps() {
  const launches = await getAllLaunchData();
  return {
    props: {
      launches,
    },
  };
}
export default function Home({ launches }) {
  return (
    <div>
      <Head>
        <title>Spacex Project</title>
      </Head>
      <Launch launches={launches} />
    </div>
  );
}
