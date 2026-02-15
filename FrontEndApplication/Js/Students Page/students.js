// import all functions that students need
import { getDataFromServer,getCurrentData } from "../modules/getDataFromServer.js";
import {
  makeHeaderTable,
  updateTableContent
} from "../modules/dispalyTable.js";
// variables
const studentsURL = "http://localhost:3000/students",
  coursesURL = "http://localhost:3000/courses";
const studentsData = await getDataFromServer(studentsURL);
const coursesData = await getDataFromServer(coursesURL);
let sizePerPage = 10,//defalut ten element per page
  currentStartStudents = 1,
  currentEndStudents=currentStartStudents+sizePerPage-1,
  keysofStudents = Object.keys(studentsData[0]),
  pagesortedBy = keysofStudents[0],
  typeofSort = "asc",
  currentStudents,
  currentPage=1;
// start point
makeHeaderTable(keysofStudents);
updatePage();
updatepagination();
// events handler
// 1.size of students
document
  .querySelector(".left-section select")
  .addEventListener("change", () => {
    // 1. if user change size per page Update sizePerPage 
    sizePerPage = Number(document.querySelector(".left-section select").value);
    // 2. Update currentEndStudents because it will be changed but start still
    currentEndStudents=currentStartStudents+sizePerPage-1;
    // 3. update page 
    updatePage();
    // 4. update pagination
    updatepagination();
  });

// 2. sort based on clicking on header
document.querySelector("thead").addEventListener("click", (event) => {
  // 1. select which header we clicked
  const selectedTh = event.target.closest("th").classList[0];
  if (selectedTh !== "edit" && selectedTh !== "delete"&&selectedTh!=="courses") { 
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
      document
        .querySelector(`thead .${pagesortedBy} .upBtn`)
        .classList.remove("active");
      document
        .querySelector(`thead .${pagesortedBy} .downBtn`)
        .classList.remove("active");
      // add active to new one
      document.querySelector(`thead .${selectedTh} .upBtn`).classList.add('active');
      pagesortedBy=selectedTh;
      typeofSort='asc';
    }
    // 2. sort data
    sortTableContent();
    // 3. update table content
    updateTableContent(currentStudents,coursesData);
  }
});

function sortArrayOfObjectsByNumbers(myObject,propertyName,type){
  if(type==='asc')
    myObject.sort((a,b)=>a[propertyName]-b[propertyName]);
  else
    myObject.sort((a,b)=>b[`${propertyName}`]-a[`${propertyName}`]);
}
function sortArrayOfObjectsByStrings(myObject,propertyName,type){
  if(type==='asc')
    myObject.sort((a,b)=>a[propertyName].localeCompare(b[propertyName]));
  else
    myObject.sort((a,b)=>b[propertyName].localeCompare(a[propertyName]));
}
function sortArrayOfObjectsByDate(myObject,propertyName,type){
  myObject.sort((a,b)=>{ 
    // 1. in each object we have this format dd/mm/yy so we will iterate on them and split based on / then return as number not string
    const [day1,month1,year1] = a[propertyName].split('/').map(stringDate=>Number(stringDate));
    const [day2,month2,year2] = b[propertyName].split('/').map(stringDate=>Number(stringDate));
    // 2. convert them to date so we can compare them
    const date1 = new Date(year1, month1 - 1, day1); 
    const date2 = new Date(year2, month2 - 1, day2);
    if(type==='asc')
      return date1 - date2;
    return date2 - date1;
  });
}
function updateMessage(){
  document.querySelector(".message").textContent=`Showing ${currentStartStudents} to ${currentEndStudents} of ${studentsData.length} entries`;
}
function updatepagination(){
  // 1. create two fixed buttons << and <
  let result=`
  <div class="firstPage"><<</div>
  <div class="perviousPage"><</div>
  `;
  // 2. create page with numbers based on total of pages that we will have
  for(let page=1,size=totalPages();page<=size;page++){
    result+=`<div class='page${page}'>${page}</div>`;
  }
  // 3. create last two fixed buttons > and >>
  result+=`
  <div class="nextPage">></div>
  <div class="lastPage">>></div>
  `;
  // 4. insert it to html
  document.querySelector(".paginationContainer").innerHTML=result;
  // 5. add active style to current page
  document.querySelector(`.page${currentPage}`).classList.add("activePage");
}
function totalPages(){
  return Math.ceil(studentsData.length / sizePerPage);
}
// event for pagination
document.querySelector(".paginationContainer").addEventListener("click",event=>{
  // 1. change css to make active new currentPage button and delete it from previous + select new currentPage
  const previosPage=currentPage;
  currentPage=getNewPage(event.target.classList[0]);
  document.querySelector(`.page${previosPage}`).classList.remove("activePage");
  document.querySelector(`.page${currentPage}`).classList.add("activePage");
  // 2. currentPage updated so we must updata page
  currentStartStudents=(currentPage-1)*sizePerPage+1; // new start
  currentEndStudents=currentStartStudents+sizePerPage-1; // new end
  updatePage();
});
function getNewPage(pageName){
  // if user click on same page return current without change
  if(pageName === `page${currentPage}`)
    return currentPage; 
  // if user click on diffrent page we five option
  let value = new Map();
  // 1. click on first page
  value.set('firstPage',1);
  // 2. click on last page
  value.set('lastPage',totalPages());
  // 3. click on next page
  value.set('nextPage',currentPage!==totalPages()?currentPage+1:currentPage);
  // 4. click on prev page
  value.set('perviousPage',currentPage!==1?currentPage-1:currentPage);
  return value[pageName] || Number(pageName.substring(pageName.lastIndexOf('e')+1));
  // 5. click on specific page then return number after e letter that represent number of page
}
function updatePage(){
  // 1. get data you need from students array
  currentStudents = getCurrentData(studentsData,currentStartStudents,currentEndStudents);
  // 2. sort data 
  sortTableContent(pagesortedBy,typeofSort);
  // 3. dispaly data in table
  updateTableContent(currentStudents,coursesData);
  // 4. dispaly update message
  updateMessage();
}
function sortTableContent(){
  if(pagesortedBy==='id')
    sortArrayOfObjectsByNumbers(currentStudents,pagesortedBy,typeofSort);
  else if(pagesortedBy === 'birthday')
    sortArrayOfObjectsByDate(currentStudents,pagesortedBy,typeofSort);
  else
    sortArrayOfObjectsByStrings(currentStudents,pagesortedBy,typeofSort);
}

// search 
document.querySelector(".searchInput").addEventListener("keyup",(event)=>{
  let word = event.target.value;
  // suppose search on first name for now
  
});