export function totalPages(primaryArrayOfObject,sizePerPage) {
  return Math.ceil(primaryArrayOfObject.length / sizePerPage);
}
export function updatepagination(primaryArrayOfObject,sizePerPage,currentPage) {
  // 1. create two fixed buttons << and <
  let result = `
  <div class="firstPage"><<</div>
  <div class="perviousPage"><</div>
  `;
  // 2. create page with numbers based on total of pages that we will have
  let haveActivePage=false;
  for (let page = 1, size = totalPages(primaryArrayOfObject,sizePerPage); page <= size; page++) {
    result += `<div class='page${page}'>${page}</div>`,haveActivePage=true;
  }
  // 3. create last two fixed buttons > and >>
  result += `
  <div class="nextPage">></div>
  <div class="lastPage">>></div>
  `;
  // 4. insert it to html
  document.querySelector(".paginationContainer").innerHTML = result;
  // 5. add active style to current page
  if(haveActivePage)
    document.querySelector(`.page${currentPage}`).classList.add("activePage");
}
export function getNewPage(pageName,currentPage,primaryArrayOfObject,sizePerPage) {
  // if user click on same page return current without change
  if (pageName === `page${currentPage}`) return currentPage;
  // if user click on diffrent page we five option
  let value = new Map();
  // 1. click on first page
  value.set("firstPage", 1);
  // 2. click on last page
  value.set("lastPage", totalPages(primaryArrayOfObject,sizePerPage));
  // 3. click on next page
  value.set("nextPage",currentPage !== totalPages(primaryArrayOfObject,sizePerPage) ? currentPage + 1 : currentPage);
  // 4. click on prev page
  value.set("perviousPage", currentPage !== 1 ? currentPage - 1 : currentPage);
  // 5. click on specific page then return number after e letter that represent number of page
  return (value.get(pageName) || Number(pageName.substring(pageName.lastIndexOf("e") + 1)));
}