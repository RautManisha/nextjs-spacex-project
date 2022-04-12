import Link from "next/link";
import Image from "next/image";

export default function Launch({ launches }) {
  return (
    <section>
      <ul className="grid grid-cols-2 gap-4 justify-items-center content-evenly">
        {launches.map((launch, i) => {
          return (
            <Link href={`/LaunchDetails/${launch.id}`} key={launch.id + i}>
              <div className="card cursor-pointer transition ease-in-out bg-yellow-300 hover:bg-yellow-200 duration-300">
                <div className="grid grid-cols-2 gap-4 justify-items-center content-evenly ">
                  <div>
                    <a>
                      <h3 className="pt-1 text-md  text-center font-bold">
                        {launch.mission_name}
                      </h3>
                    </a>
                    <p className="pt-1 text-sm text-center">
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
