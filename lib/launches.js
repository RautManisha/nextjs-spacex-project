import { createClient } from "urql";

const client = createClient({
  url: "https://api.spacex.land/graphql/",
});
export async function getAllLaunchData(offset = 0) {
  const query = `
   {
    launches(limit:20, offset:${offset}){
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
        flickr_images
      }
      rocket {
        rocket_name
      }
      launch_success
    }
   }`;

  const result = await client.query(query).toPromise();
  return result.data.launches;
}

export async function getPastLaunchData(offset = 0) {
  const query = `
   {
    launchesPast(limit:20, offset:${offset}){
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
        flickr_images
      }
      rocket {
        rocket_name
      }
      launch_success
    }
   }`;

  const result = await client.query(query).toPromise();
  return result.data.launchesPast;
}

export async function getNextLaunchData(offset = 0) {
  const query = `
   {
    launchNext(offset:${offset}){
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
        flickr_images
      }
      rocket {
        rocket_name
      }
      launch_success
    }
   }`;

  const result = await client.query(query).toPromise();
  if (result) {
    const dataArray = [];
    dataArray.push(result.data.launchNext);
    return dataArray;
  }
  return result.data.launchNext;
}

export async function getUpcomingLaunchData(offset = 0) {
  const query = `
   {
    launchesUpcoming(limit:20, offset:${offset}){
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
        flickr_images
      }
      rocket {
        rocket_name
      }
      launch_success
    }
   }`;

  const result = await client.query(query).toPromise();
  return result.data.launchesUpcoming;
}

export async function getLatestLaunchData(offset = 0) {
  const query = `
   {
    launchLatest(offset:${offset}){
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
        flickr_images
      }
      rocket {
        rocket_name
      }
      launch_success
    }
   }`;

  const result = await client.query(query).toPromise();
  if (result) {
    const dataArray = [];
    dataArray.push(result.data.launchLatest);
    return dataArray;
  }
  return result.data.launchLatest;
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
        flickr_images
      }
      rocket {
        rocket_name
      }
      launch_success
    }
  }`;
  const result = await client.query(query).toPromise();
  return result.data.launch;
}

export async function getAllIds() {
  const paths = await getAllLaunchData();

  const ids = paths.map((path) => {
    return {
      params: {
        id: path.id,
      },
    };
  });
  return ids;
}
