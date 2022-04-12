import {
  getAllLaunchData,
  getLatestLaunchData,
  getNextLaunchData,
  getPastLaunchData,
  getUpcomingLaunchData,
} from "../lib/launches";

export const sortData = (data, sortKey) => {
  const dataToSort = [...data];
  if (dataToSort) {
    dataToSort.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return 1;
      } else if (a[sortKey] > b[sortKey]) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  return dataToSort;
};

export const sortOptions = [
  {
    label: "Id",
    value: "id",
  },
  {
    label: "Launch Date",
    value: "launch_date_local",
  },
  {
    label: "Mission Name",
    value: "mission_name",
  },
];

export const filterOptions = [
  {
    label: "All Launches",
    value: "launches",
  },
  {
    label: "Past Launches",
    value: "launchesPast",
  },
  // {
  //   label: "Next Launch",
  //   value: "launchNext",
  // },
  {
    label: "Upcoming Launches",
    value: "launchesUpcoming",
  },
  // {
  //   label: "Latest Launch",
  //   value: "launchLatest",
  // },
];

export const fetchData = async (filterKey, data) => {
  const fetchedData = [];
  switch (filterKey) {
    case "launches":
      fetchedData = await getAllLaunchData(data.length);
      break;
    case "launchesPast":
      fetchedData = await getPastLaunchData(data.length);
      break;
    // case "launchNext":
    //   fetchedData = await getNextLaunchData(data.length);
    //   break;
    case "launchesUpcoming":
      fetchedData = await getUpcomingLaunchData(data.length);
      break;
    // case "launchLatest":
    //   // console.log(data.length);
    //   fetchedData = await getLatestLaunchData(0);
    //   break;
    default:
      fetchedData = await getAllLaunchData(data.length);
      break;
  }
  return fetchedData;
};
