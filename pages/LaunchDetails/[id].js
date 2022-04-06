import { getLaunchData, getAllLaunchData, getAllIds } from "../../lib/launches";
import Head from "next/head";

export async function getStaticProps({ params }) {
  const launchData = await getLaunchData(params.id);
  return {
    props: {
      launchData,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllIds();
  // console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export default function LaunchDetails({ launchData }) {
  return (
    <div>
      <Head>
        <title>{launchData.mission_name}</title>
      </Head>
      <article>
        <h1>{launchData.mission_name}</h1>
        <h3>{launchData.launch_date_local}</h3>
        <p>{launchData.details}</p>
        <a href={launchData.links.video_link} target="_blank">
          YouTube link
        </a>
        <br />
        <a href={launchData.links.article_link} target="_blank">
          Article link
        </a>
      </article>
    </div>
  );
}
