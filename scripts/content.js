function highlightSelection() {
    var userSelect = window.getSelection();
    console.log(userSelect);
    
    var anchorNode = userSelect.anchorNode;
    if (anchorNode && anchorNode.nodeType !== 3) {
        var nonTextLink = userSelect.anchorNode.baseURI;
        console.log("heres a link to your selection:", nonTextLink);

    } else if (userSelect.type === "Range") {
        var selectedText = userSelect.toString();
        console.log("you selected this:", selectedText);
    }

    var range = userSelect.getRangeAt(0);
    var highlighted = document.createElement('span');
    highlighted.className = 'highlighted';
    highlighted.style.backgroundColor = 'yellow';
    highlighted.style.color = 'black';
    range.surroundContents(highlighted);
    // console.log(highlighted);
}

window.addEventListener('mouseup', highlightSelection);