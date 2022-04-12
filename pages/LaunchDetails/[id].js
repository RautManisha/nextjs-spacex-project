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
    <div className="scroll-smooth bg-cyan-900 min-h-screen">
      <div className="container ">
        <Head>
          <title>{launchData.mission_name}</title>
        </Head>
        <article className="items-center block">
          <h1 className="text-center text-3xl font-bold text-gray-900/55 py-6 text-yellow-300">
            {launchData.mission_name}
          </h1>
          {launchData.links.flickr_images.map((image, i) => {
            return i === 0 ? (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image
                  // key={i}
                  src={image}
                  alt="Launch pic"
                  width={200}
                  height={200}
                ></Image>
              </div>
            ) : (
              ""
            );
          })}
          <h3 className="pt-5 text-lg  text-center font-semibold text-gray-300">
            Date of Launch:{" "}
            {new Date(launchData.launch_date_local).toLocaleDateString("en-US")}
          </h3>
          <p className="py-5 text-lg font-semibold text-center text-yellow-300">
            {launchData.details ? launchData.details : "No Details Available"}
          </p>
          <a
            href={launchData.links.video_link}
            className="no-underline hover:underline text-gray-300 font-semibold text-center block"
            target="_blank"
          >
            YouTube link
          </a>
          <a
            href={launchData.links.article_link}
            className="no-underline hover:underline text-gray-300 font-semibold text-center block"
            target="_blank"
          >
            Article link
          </a>
        </article>
        <div
          className="py-3"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href="/">
            <a className="mb-2 content-center inline-block px-6 py-2.5 bg-yellow-300 text-center  font-medium text-sm leading-normal uppercase rounded shadow-md  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
              Back to home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
