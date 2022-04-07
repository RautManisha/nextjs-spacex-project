import { getLaunchData } from "../../lib/launches";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  const launchData = await getLaunchData(params.id);
  return {
    props: {
      launchData,
    },
  };
}

// //Error with npm run build
// export async function getStaticPaths() {
//   const paths = await getAllIds();
//   // console.log(paths);
//   return {
//     paths,
//     fallback: true,
//   };
// }

export default function LaunchDetails({ launchData }) {
  return (
    <div>
      <Head>
        <title>{launchData.mission_name}</title>
      </Head>
      <article>
        <h1>{launchData.mission_name}</h1>
        <h3>{launchData.launch_date_local}</h3>
        {/* {console.log("image: ", launchData.links.flickr_images)} */}
        {launchData.links.flickr_images.map((image, i) => {
          return (
            <Image
              key={i}
              src={image}
              alt="Launch pic"
              width={200}
              height={200}
            ></Image>
          );
        })}
        <p>{launchData.details}</p>
        <a href={launchData.links.video_link} target="_blank">
          YouTube link
        </a>
        <br />
        <a href={launchData.links.article_link} target="_blank">
          Article link
        </a>
      </article>
      <div>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </div>
    </div>
  );
}
