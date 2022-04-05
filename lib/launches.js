import { createClient } from "urql";

const client = createClient({
  url: "https://api.spacex.land/graphql/",
});
export async function getAllLaunchData() {
  const query = `
   {
    launchesPast(limit:5){
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
