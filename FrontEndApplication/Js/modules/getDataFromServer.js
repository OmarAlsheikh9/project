export async function getDataFromServer(url) {
  if (
    typeof url !== "string" ||
    url === "" ||
    !url.includes("http://localhost:"))
    throw new Error(
      "URL should be string and not empty and contain http://localhost",
    );
  // get data
  let data;
  try{
    let response = await fetch(url);
    data = await response.json();
    return data;
  }catch(error){
    console.error(`Failed to fetch data Error > ${error}`);
  }
}
export function getCurrentData(data,start,end) {
  let result=[];
  for(let i=start-1;i<data.length&&i<end;i++)
    result.push(data[i]);
  return result;
}