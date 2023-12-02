const badge = document.createElement('button');
badge.style.position = 'absolute';
badge.style.bottom = '20px';
badge.style.right = '20px';
badge.style.zIndex = '100';

let clickedCount = 0;

chrome.storage.local.get(["clickedTimes"]).then((result) => {
    clickedCount = result.clickedTimes || 0;
    badge.innerText = `Click me. Clicked ${clickedCount}`;
  });

badge.addEventListener('click', () => {

  let els = document.querySelectorAll('body *');
  els.forEach((el) => {
    el.style.fontSize = `${Math.floor(Math.random() * 20 + 5)}px`;
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;

    el.style.color = `rgb(${r}, ${g}, ${b})`;
  });

clickedCount++;
chrome.storage.local.set({ clickedTimes: clickedCount }).then(() => {
    console.log("Value is set");
    badge.innerText = `Click me. Clicked ${clickedCount}`;
  });
});

document.documentElement.appendChild(badge);


