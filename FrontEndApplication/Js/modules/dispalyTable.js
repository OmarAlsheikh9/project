import { sortArrayOfObjectsByNumbers,sortArrayOfObjectsByStrings,sortArrayOfObjectsByDate } from "./sortingMethods.js";
export function makeHeaderTable(headers,firstObject) {
  let headerTable = `<thead><tr>`,searchTypes='';
  headers.forEach((element) => {
    headerTable += `<th class="${element}">
    <span>${element}</span>
    <div class="buttonContainer">
      <div class="upBtn">&#9650;</div>
      <div class="downBtn">&#9660;</div>
      <div class="clear-float"></div>
    </div>
    </th>`;
    // create types of search 
    if(!Array.isArray(firstObject[element])){
      searchTypes+=`<option>${element}</option>`;
    }
  });
  // insert edit and delete buttons in header of table
  headerTable += `<th class="edit">Edit</th><th class="delete">Delete</th>`;
  headerTable += `</tr></thead><tbody></tbody>`;
  document.querySelector("table").innerHTML=headerTable; 
  document.querySelector(`thead .${headers[0]} .upBtn`).classList.add('active');
  // Adding types for search
  document.querySelector(`.typeSearch`).innerHTML=searchTypes;
}
export function updateTableContent(currentData,relatedObject){
  if(!currentData[0])
    return;
  let tableHtml='';
  let firstColor = "white-row",
    secondColor = "gray-row";
  for (let i = 0; i < currentData.length; i++) {
    let element = currentData[i];
    tableHtml += `<tr class=${i % 2 ? firstColor : secondColor}>`;
    for(const key in element)
      tableHtml += `<td>${Array.isArray(element[key])?makeList(element[key],relatedObject):element[key]}</td>`;
    // insert edit and delete buttons in each row in table
    tableHtml += `<td><button class="editButton">Edit</button></td>
    <td><button class="deleteButton">Delete</button></td>
    `;
    tableHtml += `</tr>`;
  }  // update table page
  document.querySelector("table tbody").innerHTML=tableHtml;
}
function makeList(array,relatedObject){
  let result='<select class="dropList">';
  array.forEach(element=>{
    let target = relatedObject.find(item=>Number(item.id)===element);
    if(target)
      result+=`<option>${target.courseName}</option>`;
  })
  result+=`</select>`;
  return result;
}
export function sortTableContent(currentData,pagesortedBy,typeofSort) {
  if (pagesortedBy === "id")
    sortArrayOfObjectsByNumbers(currentData, pagesortedBy, typeofSort);
  else if (pagesortedBy === "birthday")
    sortArrayOfObjectsByDate(currentData, pagesortedBy, typeofSort);
  else sortArrayOfObjectsByStrings(currentData, pagesortedBy, typeofSort);
}