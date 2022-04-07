import Link from "next/link";
import Image from "next/image";

export default function Launch({ launches }) {
  return (
    <section>
      <h2>Launches</h2>
      <p>Dynamic routing enabled. Click on links for more information</p>
      <ul>
        {launches.map((launch) => {
          return (
            <div key={launch.id}>
              {/* {launch.links.flickr_images.map((image, i) => {
                return i === 0 ? (
                  <Image
                    key={i}
                    src={image}
                    alt="Launch pic"
                    width={300}
                    height={200}
                  ></Image>
                ) : (
                  ""
                );
              })} */}
              <Link href={`/LaunchDetails/${launch.id}`}>
                <a>
                  <h3>{launch.mission_name}</h3>
                </a>
              </Link>
              {/* {console.log(launch.links.flickr_images[0])} */}

              <p>
                <strong>Launch Date:</strong>{" "}
                {new Date(launch.launch_date_local).toLocaleDateString("en-US")}
              </p>
            </div>
          );
        })}
      </ul>
    </section>
  );
}
