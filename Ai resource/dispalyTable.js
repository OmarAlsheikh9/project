export function dispalyTable(data, start = 1, size = 10) {
  // 1.vaildation for input data
  if (
    !Array.isArray(data) ||
    !isNumberBiggerZero(start) ||
    !isNumberBiggerZero(size)
  )
    throw new Error(
      "1.Data must be array\n2.start should be number bigger than or equal zero\n3.size must be number bigger than zero",
    );
  // 2. show header of table
  makeHeaderTable(Object.keys(data[0]));
  // 3. update data rows of table
  // updateTable();    
  // second rows of data
  let tableHtml='<tbody>';
  start--; // decrease start one because array zero-index
  let firstColor = "white-row",
    secondColor = "gray-row";
  for (let i = start, loop = 1; i < size && i < data.length; i++, loop++) {
    let element = data[i];
    tableHtml += `<tr class=${loop % 2 ? firstColor : secondColor}>`;
    for(const key in element)
      tableHtml += `<td>${element[key]}</td>`;
    // insert edit and delete buttons in each row in table
    tableHtml += `<td><button class="editButton">Edit</button></td>
    <td><button class="deleteButton">Delete</button></td>
    `;
    tableHtml += `</tr>`;
  }
  tableHtml+=`</tbody>`;
  // update table page
  document.querySelector("table tbody").innerHTML=tableHtml;
}
function isNumberBiggerZero(input) {
  return typeof input === "number" && input > 0;
}
function makeHeaderTable(headers) {
  let headerTable = `<thead><tr>`;
  headers.forEach((element) => {
    headerTable += `<th>
    <span>${element}</span>
    <div class="buttonContainer">
      <div>&#9650;</div>
      <div>&#9660;</div>
    </div>
    </th>`;
  });
  // insert edit and delete buttons in header of table
  headerTable += `<th>Edit</th><th>Delete</th>`;
  headerTable += `</tr></thead>`;
  document.querySelector("thead").innerHTML=headerTable; 
}
