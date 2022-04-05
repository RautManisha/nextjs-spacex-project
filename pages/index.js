import { getAllLaunchData } from "../lib/launches";

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
    <>
      <div>
        {launches.map((launch) => {
          return (
            <a key={launch.id} href={launch.links.video_link}>
              <h3>{launch.mission_name}</h3>
              <p>
                <strong>Launch Date:</strong>{" "}
                {new Date(launch.launch_date_local).toLocaleDateString("en-US")}
              </p>
              <br />
            </a>
          );
        })}
      </div>
    </>
  );
}
