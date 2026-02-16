// This Script split into two part (Start Point with inital vaules) + (event handler)

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Part 1 Start Point with inital vaules <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// 1. Start Point 
// 1.1 import all functions that employees need
import { getDataFromServer} from "../modules/getDataFromServer.js";
import {makeHeaderTable,updateTableContent,sortTableContent} from "../modules/dispalyTable.js";
import { updatepagination,getNewPage} from "../modules/pagination.js";
import { updatePageAfterAnyChange } from "../modules/updatePage.js";
// 1.2 variables with default values

let employeessURL = "http://localhost:3000/employees",
mainObject = await getDataFromServer(employeessURL),mainObjectName="employees",
relatedObject = '';

let sizePerPage = 10,
  currentStart = mainObject.length > 0 ? 1 : 0,
  currentEnd = currentStart + sizePerPage - 1,
  keysofEmployees = Object.keys(mainObject[0]),
  pagesortedBy = keysofEmployees[0],
  typeofSort = "asc",
  currentData,
  currentPage=1;
// 1.3 start point default page
makeHeaderTable(keysofEmployees,mainObject[0]);
currentData= updatePageAfterAnyChange(currentData,mainObject,pagesortedBy,typeofSort,relatedObject,currentStart,currentEnd,mainObjectName);
updatepagination(mainObject,sizePerPage,currentPage);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Part 2 Events Handle <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<







// part 2 Events Handle Four events handler
// 2.1 Event for changing size per page 
// 2.2 Event for changing sorting 
// 2.3 Event for changing current page 
// 2.4 Event for searching
// 2.5 Event for adding new element
// 2.6 Event for delete element in > update table content function because add event in every change to table
// 2.7 Event for edit element   in > update table content function because add event in every change to table


// 2.1 Event Handle for change size per page
document.querySelector(".left-section select").addEventListener("change", () => {
  // 1. user change size so we will get new one as number
  sizePerPage = Number(document.querySelector(".left-section select").value);
  // 2. only current end will be change but current start won't change
  currentEnd=currentStart+sizePerPage-1;
  // 3. because we change size we will change currentData and dipaly it with new pagination
  currentData = updatePageAfterAnyChange(currentData,mainObject,pagesortedBy,typeofSort,relatedObject,currentStart,currentEnd,mainObjectName);
  // 4. new pagination
  updatepagination(mainObject,sizePerPage,currentPage);
});



// 2.2 Event for changing sort based on clicking on header
document.querySelector("thead").addEventListener("click", (event) => {
  // 1. select which header we clicked
  const selectedTh = event.target.closest("th").classList[0];
  if (selectedTh !== "edit" &&selectedTh !== "delete" &&selectedTh !== "courses") {
    // We will change page by sort +  change active button
    // 1. if user click on same header we already sort by then reverse type of sort
    if (selectedTh === pagesortedBy) {
      typeofSort = typeofSort === "asc" ? "des" : "asc";
      // css style
      document.querySelector(`thead .${pagesortedBy} .upBtn`).classList.toggle("active");
      document.querySelector(`thead .${pagesortedBy} .downBtn`).classList.toggle("active");
    } 
    else {
      //2. if diffrent header remove active from current th then add to new one
      document.querySelector(`thead .${pagesortedBy} .upBtn`).classList.remove("active");
      document.querySelector(`thead .${pagesortedBy} .downBtn`).classList.remove("active");
      // add active to new one
      document.querySelector(`thead .${selectedTh} .upBtn`).classList.add("active");
      pagesortedBy = selectedTh;
      typeofSort = "asc";
    }
    // 2. sort data
    sortTableContent(currentData,pagesortedBy,typeofSort);
    // 3. update table content
    updateTableContent(currentData, relatedObject,mainObjectName);
  }
});



// 2.3 Event for pagination
document.querySelector(".paginationContainer").addEventListener("click", (event) => {
  // 1. change css to make active new currentPage button and delete it from previous + select new currentPage
  const previosPage = currentPage;
  currentPage = getNewPage(event.target.classList[0],currentPage,mainObject,sizePerPage);
  document.querySelector(`.page${previosPage}`).classList.remove("activePage");
  document.querySelector(`.page${currentPage}`).classList.add("activePage");
  // 2. currentPage updated so we must updata page
  currentStart = (currentPage - 1) * sizePerPage + 1; // new start
  currentEnd = currentStart + sizePerPage - 1; // new end
  updatePageAfterAnyChange(currentData,mainObject,pagesortedBy,typeofSort,relatedObject,currentStart,currentEnd,mainObjectName);
});

  
// 2.4 Event for search
document.querySelector(".searchInput").addEventListener("keyup", async(event) => {
  let searchInputValue = (event.target.value).trim().toLowerCase();
  let typeSearch=document.querySelector('.typeSearch').value;
  // get updated data
  mainObject = await getDataFromServer(employeessURL);
  // filter data
  mainObject = mainObject.filter(element=>{
    return element[typeSearch].toString().toLowerCase().includes(searchInputValue);
  });
  currentStart= mainObject.length > 0 ? 1 : 0;
  currentEnd=currentStart + sizePerPage - 1;
  currentData=updatePageAfterAnyChange(currentData,mainObject,pagesortedBy,typeofSort,relatedObject,currentStart,currentEnd,mainObjectName);
  updatepagination(mainObject,sizePerPage,currentPage);
});


// 2.5 Event for add element
document.querySelector(".add-std").addEventListener("click", (e)=>{
  // open manage page
  window.location.href = `../Html/manageemployees.html`;
});