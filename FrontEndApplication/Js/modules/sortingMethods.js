export function sortArrayOfObjectsByNumbers(primaryArrayOfObject, propertyName, type) {
  if (type === "asc")
    primaryArrayOfObject.sort((a, b) => a[propertyName] - b[propertyName]);
  else primaryArrayOfObject.sort((a, b) => b[propertyName] - a[propertyName]);
}
export function sortArrayOfObjectsByStrings(primaryArrayOfObject, propertyName, type) {
  if (type === "asc")
    primaryArrayOfObject.sort((a, b) => a[propertyName].localeCompare(b[propertyName]));
  else primaryArrayOfObject.sort((a, b) => b[propertyName].localeCompare(a[propertyName]));
}
export function sortArrayOfObjectsByDate(primaryArrayOfObject, propertyName, type) {
  primaryArrayOfObject.sort((a, b) => {
  // 1. in each object we have this format dd/mm/yy so we will iterate on them and split based on / then return as number not string
  const [day1, month1, year1] = a[propertyName].split("/").map((stringDate) => Number(stringDate));
  const [day2, month2, year2] = b[propertyName].split("/").map((stringDate) => Number(stringDate));
  // 2. convert them to date so we can compare them
  const date1 = new Date(year1, month1 - 1, day1);
  const date2 = new Date(year2, month2 - 1, day2);
  if (type === "asc") return date1 - date2;
  return date2 - date1;
  });
}
