import { deleteOneTarget , getOneTarget } from "./getDataFromServer.js"


export function makeHeaderTable(headers) {
  let headerTable = `<thead><tr>`;
  headers.forEach((element) => {
    headerTable += `<th class="${element}">
    <span>${element}</span>
    <div class="buttonContainer">
      <div class="upBtn">&#9650;</div>
      <div class="downBtn">&#9660;</div>
      <div class="clear-float"></div>
    </div>
    </th>`;
  });
  // insert edit and delete buttons in header of table
  headerTable += `<th class="edit">Edit</th><th class="delete">Delete</th>`;
  headerTable += `</tr></thead><tbody></tbody>`;
  document.querySelector("table").innerHTML=headerTable; 
  document.querySelector(`thead .${headers[0]} .upBtn`).classList.add('active');
}
export function updateTableContent(data,relatedObject,mainObject){
  let tableHtml='';
  let firstColor = "white-row",
    secondColor = "gray-row";
  for (let i = 0; i < data.length; i++) {
    let element = data[i];
    tableHtml += `<tr class=${i % 2 ? firstColor : secondColor}>`;
    for(const key in element)
      tableHtml += `<td>${Array.isArray(element[key])?makeList(element[key],relatedObject):element[key]}</td>`;
    // insert edit and delete buttons in each row in table
    tableHtml += `<td><button class="editButton" data-id="${element.id}">Edit</button></td>
    <td><button class="deleteButton" data-id="${element.id}">Delete</button></td>
    `;
    tableHtml += `</tr>`;
  }  // update table page
  document.querySelector("table tbody").innerHTML=tableHtml;
  // target button for crud operations 
  const deleteButtons  = document.querySelectorAll(".deleteButton");
  for (let i = 0; i < deleteButtons.length; i++) {
    
    deleteButtons[i].addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      // console.log(mainObject)
      deleteOneTarget(id , mainObject);
    });
  }
  const editButtons  = document.querySelectorAll(".editButton");
  for (let i = 0; i < editButtons.length; i++) {
    
    editButtons[i].addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      window.location.href = `../Html/manage${mainObject}.html?id=${id}`;
      //getOneTarget(id);
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