let clickedEl = document.getElementById('clickedTimes');
let clickedCount = 0;

chrome.storage.local.get(["clickedTimes"]).then((result) => {
    clickedCount = result.clickedTimes || 0;
    clickedEl.innerText = `Clicked ${clickedCount}`;
  });