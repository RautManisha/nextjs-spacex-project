import Link from "next/link";
import Image from "next/image";

export default function Launch({ launches }) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900/55 py-6 text-gray-300">
        Launches
      </h2>

      <ul className="grid grid-cols-2 gap-4 justify-items-center content-evenly">
        {launches.map((launch) => {
          return (
            <Link href={`/LaunchDetails/${launch.id}`} key={launch.id}>
              <div className="card cursor-pointer transition ease-in-out bg-yellow-300 hover:bg-yellow-200 duration-300">
                <div className="grid grid-cols-2 gap-4 justify-items-center content-evenly">
                  <div>
                    <a>
                      <h3>{launch.mission_name}</h3>
                    </a>
                    <p>
                      <strong>Launch Date:</strong>{" "}
                      {new Date(launch.launch_date_local).toLocaleDateString(
                        "en-US"
                      )}
                    </p>
                  </div>
                  <div>
                    {launch.links.flickr_images.map((image, i) => {
                      return i === 0 ? (
                        <Image
                          key={i}
                          src={image}
                          alt="Launch pic"
                          width={100}
                          height={100}
                        ></Image>
                      ) : (
                        ""
                      );
                    })}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
