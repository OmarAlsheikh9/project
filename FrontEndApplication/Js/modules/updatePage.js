import { getCurrentData } from "./getDataFromServer.js";
import { updateTableContent,sortTableContent } from "./dispalyTable.js";
import { updateMessage } from "./updateMessage.js";
export function updatePageAfterAnyChange(currentData,mainObject,pagesortedBy,typeofSort,relatedObject,currentStart,currentEnd,mainObjectName) {
  // 1. get data you need from students array
  currentData = getCurrentData(mainObject,currentStart,currentEnd)||'';
  if(!currentData)
    currentData.pop();
    // 2. sort data
  sortTableContent(currentData,pagesortedBy, typeofSort);
  // 3. dispaly data in table
  updateTableContent(currentData, relatedObject,mainObjectName);
  // 4. dispaly update message
  updateMessage(currentStart,currentEnd,mainObject);
  return currentData;
}