export default function Launch({ launches }) {
  return (
    <section>
      <h2>Launches</h2>
      <ul>
        {launches.map((launch) => {
          return (
            <a key={launch.id} href={launch.links.video_link}>
              <h3>{launch.mission_name}</h3>
              <p>
                <strong>Launch Date:</strong>{" "}
                {new Date(launch.launch_date_local).toLocaleDateString("en-US")}
              </p>
            </a>
          );
        })}
      </ul>
    </section>
  );
}
