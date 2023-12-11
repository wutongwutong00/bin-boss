const initialBin = []; 
const archiveBin = []; 
const bins = [{name: 'Initial Bin', contents: [initialBin]}, {name: 'Archive Bin', contents: [archiveBin]}];


let now = new Date();

class Highlight {
    content;
    yourNotes;
    title;
    time;
    author;
    deathTime; 
    index;
    highlightDeathCheck;

    constructor (content, notes) {
        let day = now.getDate();
        let month = now.toLocaleString('default', { month: 'long' });
        let year = now.getFullYear();

        let currentDate = `${day} ${month} ${year}`; 

        this.content = content;
        this.yourNotes = notes; 
        this.title = document.title; 
        this.time = currentDate;
        this.author = window.location.host; 
        this.deathTime = (now.getTime()+ 12096e5);
        this.index = initialBin.length; 

        initialBin.push(this);
        this.highlightDeathCheck = setInterval(this.highlightDeath(), 10000);
    }


    highlightDeath(){
        if (now.getTime() >= this.deathTime) { 
            archiveBin.push(initialBin[this.index]);
            initialBin.splice(this.index, 1);
            this.deathTime = (now.getTime()+ 12096e5);
            console.log('highlight go bye bye');
            console.log(archiveBin);
            clearInterval(this.highlightDeathCheck);
            this.highlightDeathCheck = setInterval(this.highlightRealDeath(), 10000);
        } else {
            console.log('this highlight has more time to live');
        }
    }

    highlightRealDeath(){
    if ( now.getTime() >= this.deathTime) { 
        initialBin.splice(this.index, 1);
        clearInterval(this.highlightDeathCheck);
    } else {
        console.log('highlight is permanently deleted');
    }
}

}

var userSelect = window.getSelection();
var userSelected = '';
var notes = '';

function highlightSelection() {
    var anchorNode = userSelect.anchorNode;
    if (anchorNode && anchorNode.nodeType !== 3) {
        var nonTextLink = userSelect.anchorNode.baseURI;
        console.log("heres a link to your selection:", nonTextLink);
        userSelected = nonTextLink;
    } else if (userSelect.type === "Range") {
        var selectedText = userSelect.toString();
        console.log("you selected this:", selectedText);
        userSelected = selectedText;
    }
}
window.addEventListener('mouseup', highlightSelection);

function addHighlightColor() {
    var range = userSelect.getRangeAt(0);
    var highlighted = document.createElement('span');
    highlighted.className = 'highlighted';
    highlighted.style.backgroundColor = 'yellow';
    highlighted.style.color = 'black';
    range.surroundContents(highlighted);
}

let input = document.createElement('textarea');
let inputButton = document.createElement('button');

function inputNotes () {
    input.style.position = 'fixed';
    input.style.fontFamily = 'monospace';
    input.style.fontSize = '10px';
    input.style.width = '200px';
    input.style.height = '50px';
    input.style.bottom = '20px';
    input.style.right = '20px';
    input.style.zIndex = '100';
    input.style.padding = '10px';
    input.setAttribute("placeholder", "Notes here");
    document.body.appendChild(input); 

    inputButton.style.position = 'fixed';
    inputButton.style.fontFamily = 'monospace';
    inputButton.style.fontSize = '10px';
    inputButton.style.textAlign = 'center';
    inputButton.style.height = '20px';
    inputButton.style.width = '40px';
    inputButton.style.bottom = '80px';
    inputButton.style.right = '20px';
    inputButton.style.zIndex = '100';
    inputButton.innerText = 'save';
    document.body.appendChild(inputButton);
}


window.addEventListener('keydown', (e) => {
    if (e.key === 's' && e.ctrlKey) {
        console.log('highlight saved!');
        addHighlightColor();
        new Highlight(userSelected, notes);
        console.log(initialBin);
        chrome.storage.sync.set({bins: bins}).then(() => {
            console.log("Value is set");
        }); 
        chrome.storage.sync.get(["bins"]).then((data) => {
            console.log(data);
        }); 

    } else if (e.key === 'a' && e.ctrlKey) {
        addHighlightColor();
        inputNotes();
        input.focus();

        inputButton.addEventListener('click', (e) => {
            console.log('note input fulfilled');
            inputButton.style.display = 'none';
            input.style.display = 'none';
            notes = input.value;
            new Highlight(userSelected, notes);
            chrome.storage.sync.set({bins: bins}).then(() => {
                console.log("Value is set");
            }); 
            chrome.storage.sync.get(["bins"]).then((data) => {
                console.log(data);
            }); 
        })
    
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                console.log('note input fulfilled');
                inputButton.style.display = 'none';
                input.style.display = 'none';
                notes = input.value;
                new Highlight(userSelected, notes);
                chrome.storage.sync.set({bins: bins}).then(() => {
                    console.log("Value is set");
                }); 
                chrome.storage.sync.get(["bins"]).then((data) => {
                    console.log(data);
                }); 
             }
        });
    } 

    window.addEventListener('keyup', () => {
        keydown = false;
        });
});