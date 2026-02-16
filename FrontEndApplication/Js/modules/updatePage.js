import { getCurrentData } from "./getDataFromServer.js";
import { updateTableContent,sortTableContent } from "./dispalyTable.js";
import { updateMessage } from "./updateMessage.js";
export function updatePageAfterAnyChange(currentData,primaryArrayOfObject,pagesortedBy,typeofSort,relatedObject,currentStart,currentEnd) {
  // 1. get data you need from students array
  currentData = getCurrentData(primaryArrayOfObject,currentStart,currentEnd)||'';
  if(!currentData)
    currentData.pop();
    // 2. sort data
  sortTableContent(currentData,pagesortedBy, typeofSort);
  // 3. dispaly data in table
  updateTableContent(currentData, relatedObject);
  // 4. dispaly update message
  updateMessage(currentStart,currentEnd,primaryArrayOfObject);
  return currentData;
}