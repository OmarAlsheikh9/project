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
    let responseAsString = await fetch(url);
    data = await responseAsString.json();
  }catch{
    console.log(error);
  }
  return data;
}