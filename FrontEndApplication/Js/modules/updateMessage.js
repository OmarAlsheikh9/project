export function updateMessage(currentStart,currentEnd,mainObject) {
  document.querySelector(".message").textContent =`Showing ${currentStart} to ${currentEnd} of ${mainObject.length} entries`;
}