export function updateMessage(currentStart,currentEnd,primaryArrayOfObject) {
  document.querySelector(".message").textContent =`Showing ${currentStart} to ${currentEnd} of ${primaryArrayOfObject.length} entries`;
}