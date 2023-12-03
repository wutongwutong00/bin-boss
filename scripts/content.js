function highlightSelection() {
    var userSelect = window.getSelection();
    console.log(userSelect);
    if (userSelect.type === "Range") {
        console.log(userSelect.toString());
    }
}

window.addEventListener('mouseup', highlightSelection);