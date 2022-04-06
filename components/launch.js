import Link from "next/link";

export default function Launch({ launches }) {
  return (
    <section>
      <h2>Launches</h2>
      <p>Dynamic routing enabled. Click on links for more information</p>
      <ul>
        {launches.map((launch) => {
          return (
            <Link key={launch.id} href={`/LaunchDetails/${launch.id}`}>
              <a>
                <h3>{launch.mission_name}</h3>
                <p>
                  <strong>Launch Date:</strong>{" "}
                  {new Date(launch.launch_date_local).toLocaleDateString(
                    "en-US"
                  )}
                </p>
              </a>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
