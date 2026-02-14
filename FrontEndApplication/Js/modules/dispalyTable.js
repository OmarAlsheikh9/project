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
  // 2.make table to show it in page
  // first header for table for first name and meta data for each object
  let headerTable = Object.keys(data[0]);
  let tableHtml = `<tr>`;
  headerTable.forEach((element) => {
    tableHtml += `<th>${element}</th>`;
  });
  // insert edit and delete buttons in header of table
  tableHtml += `<th>Edit</th><th>Delete</th>`;
  tableHtml += `</tr>`;
  // second rows of data
  start--; // decrease start one because array zero-index
  let firstColor = "white-row",
    secondColor = "gray-row";
  for (let i = start, loop = 1; i < size && i < data.length; i++, loop++) {
    let element = data[i];
    tableHtml += `<tr class=${loop % 2 ? firstColor : secondColor}>`;
    headerTable.forEach((key) => {
      tableHtml += `<td>${element[key]}</td>`;
    });
    // insert edit and delete buttons in each row in table
    tableHtml += `<td><button class="editButton">Edit</button></td>
    <td><button class="deleteButton">Delete</button></td>
    `;
    tableHtml += `</tr>`;
  }
  // update table page
  document.querySelector(".table-section table").innerHTML = tableHtml;
}
function isNumberBiggerZero(input) {
  return typeof input === "number" && input > 0;
}
