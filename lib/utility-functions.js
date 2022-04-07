export const sortData = (data, sortKey) => {
  const dataToSort = [...data];
  dataToSort.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return 1;
    } else if (a[sortKey] > b[sortKey]) {
      return -1;
    } else {
      return 0;
    }
  });
  return dataToSort;
};
