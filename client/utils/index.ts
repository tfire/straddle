export const formatDate = (date) => {
  let newDate = new Date(0);
  newDate.setUTCSeconds(+date);
  const formattedDate =
    newDate.getUTCDate() +
    "-" +
    (newDate.getUTCMonth() + 1) +
    "-" +
    newDate.getUTCFullYear();
  return formattedDate;
};
