function highlightSelection () {
    var userSelect = window.getSelection();
    console.log(userSelect);
    if (userSelect.type === String){
        console.log(userSelect.focusNode.textContent);
    }
}

window.addEventListener('select', highlightSelection());


// chrome.storage.local.get(['clickedTimes']).then((result) => {
//     let clickedCount = result.clickedTimes || 0; 
//     badge.innerText = `Click me. Clicked ${clickedCount}`;
// });