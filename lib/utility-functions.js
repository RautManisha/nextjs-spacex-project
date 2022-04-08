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
