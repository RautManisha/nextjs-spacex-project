import { createClient } from "urql";

const client = createClient({
  url: "https://api.spacex.land/graphql/",
});
export async function getAllLaunchData() {
  const query = `
   {
    launchesPast{
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
        mission_patch
      }
      rocket {
        rocket_name
      }
    }
   }`;

  const result = await client.query(query).toPromise();
  return result.data.launchesPast;
}

export async function getLaunchData(id) {
  const query = `
  {
    launch(id: ${id}) {
      id
      details
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
        mission_patch
      }
      rocket {
        rocket_name
      }
    }
  }`;
  const result = await client.query(query).toPromise();
  // console.log(result);
  return result.data.launch;
}

export async function getAllIds() {
  const paths = await getAllLaunchData();

  // console.log("paths: ", paths);
  const ids = paths.map((path) => {
    return {
      params: {
        id: path.id,
      },
    };
  });
  return ids;
}
