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
let sizePerPage = 10,
  currentStartStudents = 1,
  currentEndStudents=currentStartStudents+sizePerPage-1,
  keysofStudents = Object.keys(studentsData[0]),
  pagesortedBy = keysofStudents[0],
  typeofSort = "asc",
  currentStudents = getCurrentData(studentsData,currentStartStudents,currentEndStudents),
  currentPage=1;
// start point
makeHeaderTable(keysofStudents);
updateTableContent(currentStudents,coursesData,"students");
updateMessage();
updatepagination();
// events handler
// 1.size of students
document
  .querySelector(".left-section select")
  .addEventListener("change", () => {
    sizePerPage = Number(document.querySelector(".left-section select").value);
    currentEndStudents=currentStartStudents+sizePerPage-1;
    currentStudents = getCurrentData(studentsData,currentStartStudents,currentEndStudents);
    updateTableContent(currentStudents,coursesData,"students");
    updateMessage();
    // update paging
    updatepagination();
  });

// 2. sort based on header
document.querySelector("thead").addEventListener("click", (event) => {
  const selectedTh = event.target.closest("th").classList[0];
  if (selectedTh !== "edit" && selectedTh !== "delete"&&selectedTh!=="courses") {
    // We will change page by sort 
    // 1. change active button 
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
      // remove active from current th
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
    // 2. edit data
    // first selected type of data we want to sort 
    if(pagesortedBy==='id' || pagesortedBy==='phone')
      sortArrayOfObjectsByNumbers(currentStudents,pagesortedBy,typeofSort);
    else if(pagesortedBy==='birthday')
      sortArrayOfObjectsByDate(currentStudents,pagesortedBy,typeofSort);
    else
      sortArrayOfObjectsByStrings(currentStudents,pagesortedBy,typeofSort);
    // 3. update table content
    updateTableContent(currentStudents,coursesData,"students");
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
      const [day1,month1,year1] = a[propertyName].split('/').map(stringDate=>Number(stringDate));
      const [day2,month2,year2] = b[propertyName].split('/').map(stringDate=>Number(stringDate));
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
  let result=`
  <div class="firstPage"><<</div>
  <div class="perviosPage"><</div>
  `;

  for(let totalElements=studentsData.length,page=1;totalElements>0;page++,totalElements-=sizePerPage){
    result+=`<div class='page${page}'>${page}</div>`;
  }
  result+=`
  <div class="lastPage">>></div>
  <div class="nextPage">></div>
  `;
  document.querySelector(".paginationContainer").innerHTML=result;
  document.querySelector(`.page${currentPage}`).classList.add("activePage");
}
// event for pagination
document.querySelector(".paginationContainer").addEventListener("click",event=>{
  // css
  const previosPage=currentPage;
  currentPage=Number(event.target.classList[0][4]);
  console.log(previosPage,currentPage);
})


document.querySelector(".add-std").addEventListener("click", (e)=>{
  window.location.href = `../Html/manageStudents.html`;
})