// This Script split into two part (Start Point with inital vaules) + (Four event handler)
// 1. Start Point 
// 1.1 import all functions that students need
import { getDataFromServer} from "../modules/getDataFromServer.js";
import {makeHeaderTable,updateTableContent,sortTableContent} from "../modules/dispalyTable.js";
import { updatepagination,getNewPage} from "../modules/pagination.js";
import { updatePageAfterAnyChange } from "../modules/updatePage.js";
// 1.2 variables with default values

let studentsURL = "http://localhost:3000/students",coursesURL = "http://localhost:3000/courses",
studentsData = await getDataFromServer(studentsURL),
coursesData = await getDataFromServer(coursesURL);

let sizePerPage = 10,
  currentStartStudents = studentsData.length > 0 ? 1 : 0,
  currentEndStudents = currentStartStudents + sizePerPage - 1,
  keysofStudents = Object.keys(studentsData[0]),
  pagesortedBy = keysofStudents[0],
  typeofSort = "asc",
  currentStudents='',
  currentPage = 1;
// 1.3 start point default page
makeHeaderTable(keysofStudents,studentsData[0]);
currentStudents=updatePageAfterAnyChange(currentStudents,studentsData,pagesortedBy,typeofSort,coursesData,currentStartStudents,currentEndStudents);
updatepagination(studentsData,sizePerPage,currentPage);
// 2. Four events handler (event for change size per page , event for sorting , event for changing current page , event for searching)
// 2.1 Event for change size per page
document.querySelector(".left-section select").addEventListener("change", () => {
  // 1. if user change size per page Update sizePerPage
  sizePerPage = Number(document.querySelector(".left-section select").value);
  // 2. Update currentEndStudents because it will be changed but start still
  currentEndStudents = currentStartStudents + sizePerPage - 1;
  // 3. update page and current data
  currentStudents = updatePageAfterAnyChange(currentStudents,studentsData,pagesortedBy,typeofSort,coursesData,currentStartStudents,currentEndStudents);
  // 4. update pagination
  updatepagination(studentsData,sizePerPage,currentPage);
});

// 2.2 Event for sort based on clicking on header
document.querySelector("thead").addEventListener("click", (event) => {
  // 1. select which header we clicked
  const selectedTh = event.target.closest("th").classList[0];
  if (selectedTh !== "edit" &&selectedTh !== "delete" &&selectedTh !== "courses") {
    // We will change page by sort +  change active button
    // 1. if user click on same header we already sort by then reverse type of sort
    if (selectedTh === pagesortedBy) {
      typeofSort = typeofSort === "asc" ? "des" : "asc";
      // css style
      document
        .querySelector(`thead .${pagesortedBy} .upBtn`)
        .classList.toggle("active");
      document
        .querySelector(`thead .${pagesortedBy} .downBtn`)
        .classList.toggle("active");
    } else {
      //2. if diffrent header remove active from current th then add to new one
      document.querySelector(`thead .${pagesortedBy} .upBtn`).classList.remove("active");
      document.querySelector(`thead .${pagesortedBy} .downBtn`).classList.remove("active");
      // add active to new one
      document.querySelector(`thead .${selectedTh} .upBtn`).classList.add("active");
      pagesortedBy = selectedTh;
      typeofSort = "asc";
    }
    // 2. sort data
    sortTableContent(currentStudents,pagesortedBy,typeofSort);
    // 3. update table content
    updateTableContent(currentStudents, coursesData);
  }
});

// 2.3 Event for pagination
document.querySelector(".paginationContainer").addEventListener("click", (event) => {
  // 1. change css to make active new currentPage button and delete it from previous + select new currentPage
  const previosPage = currentPage;
  currentPage = getNewPage(event.target.classList[0],currentPage,studentsData,sizePerPage);
  document.querySelector(`.page${previosPage}`).classList.remove("activePage");
  document.querySelector(`.page${currentPage}`).classList.add("activePage");
  // 2. currentPage updated so we must updata page
  currentStartStudents = (currentPage - 1) * sizePerPage + 1; // new start
  currentEndStudents = currentStartStudents + sizePerPage - 1; // new end
  updatePageAfterAnyChange(currentStudents,studentsData,pagesortedBy,typeofSort,coursesData,currentStartStudents,currentEndStudents);
});

// 2.4 Event for search
document.querySelector(".searchInput").addEventListener("keyup", async(event) => {
  let searchInputValue = (event.target.value).trim().toLowerCase();
  let typeSearch=document.querySelector('.typeSearch').value;
  // get updated data
  studentsData = await getDataFromServer(studentsURL);
  // filter data
  studentsData = studentsData.filter(element=>{
    return element[typeSearch].toString().toLowerCase().includes(searchInputValue);
  });
  currentStartStudents= studentsData.length > 0 ? 1 : 0;
  currentEndStudents=currentStartStudents + sizePerPage - 1;
  currentStudents=updatePageAfterAnyChange(currentStudents,studentsData,pagesortedBy,typeofSort,coursesData,currentStartStudents,currentEndStudents);
  updatepagination(studentsData,sizePerPage,currentPage);
});
// we should update studensData in every edit on db in add , edit , delete