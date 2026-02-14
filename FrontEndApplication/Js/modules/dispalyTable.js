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
export function updateTableContent(data,start=1,size=10){
  let tableHtml='';
  start--; // decrease start one because array zero-index
  let firstColor = "white-row",
    secondColor = "gray-row";
  for (let i = start, loop = 1; i < size && i < data.length; i++, loop++) {
    let element = data[i];
    tableHtml += `<tr class=${loop % 2 ? firstColor : secondColor}>`;
    for(const key in element)
      tableHtml += `<td>${Array.isArray(element[key])?makeList(element[key]):element[key]}</td>`;
    // insert edit and delete buttons in each row in table
    tableHtml += `<td><button class="editButton">Edit</button></td>
    <td><button class="deleteButton">Delete</button></td>
    `;
    tableHtml += `</tr>`;
  }  // update table page
  document.querySelector("table tbody").innerHTML=tableHtml;
}
function isNumberBiggerZero(input) {
  return typeof input === "number" && input > 0;
}
function makeList(array){
  
}