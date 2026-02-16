import { deleteOneTarget , getOneTarget } from "./getDataFromServer.js"
import { sortArrayOfObjectsByNumbers,sortArrayOfObjectsByStrings,sortArrayOfObjectsByDate } from "./sortingMethods.js";


export function makeHeaderTable(headers,firstObject) {
  // 1. make header of table and search types options
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
  // Adding active sort type
  document.querySelector(`thead .${headers[0]} .upBtn`).classList.add('active');
  // Adding types for search
  document.querySelector(`.typeSearch`).innerHTML=searchTypes;
}
export function updateTableContent(currentData,relatedObject,mainObjectName){
  // This function update table content and add evnet hanlder to all delete and edits buttons
  // 1. if there is no currentData return 
  if(!currentData[0])
    return;
  // 2. Make Table from current data and related object for selected element such courses (array of string)
  let tableHtml='';
  let firstColor = "white-row",
    secondColor = "gray-row";
  for (let i = 0; i < currentData.length; i++) {
    let element = currentData[i];
    tableHtml += `<tr class=${i % 2 ? firstColor : secondColor}>`;
    for(const key in element)
      tableHtml += `<td>${Array.isArray(element[key])?makeList(element[key],relatedObject):element[key]}</td>`;
    // insert edit and delete buttons in each row in table
    tableHtml += `<td><button class="editButton" data-id="${element.id}">Edit</button></td>
    <td><button class="deleteButton" data-id="${element.id}">Delete</button></td>
    `;
    tableHtml += `</tr>`;
  }
  // 3. update table page
  document.querySelector("table tbody").innerHTML=tableHtml;

  // Now we have table so we will add to all button event to make crud operation
  // 4. Event for delete element 
  const deleteButtons  = document.querySelectorAll(".deleteButton");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", (e) => {
      const id = e.target.dataset.id; // id for seleted element
      deleteOneTarget(id.toString() , mainObjectName);
    });
  }

  // 5. Event for edit element 
  const editButtons  = document.querySelectorAll(".editButton");
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      window.location.href = `../Html/manage${mainObjectName}.html?id=${id}`;
    });
  }
}
function makeList(array,relatedObject){
  let result='<select class="dropList">';
  array.forEach(element=>{
    let target = relatedObject.find(item=>item.id==element);
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