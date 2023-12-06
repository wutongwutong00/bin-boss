
const initialBin = []; 
const archiveBin = []; 
const bins = [{name: 'Initial Bin', contents: [initialBin]}, {name: 'Archive Bin', contents: [archiveBin]}];

class Highlight {
    content;
    yourNotes;
    title;
    time;
    author;
    deathTime; 
    index;

    constructor (content, notes, title, time, author) {
        let date = new Date(); 
        let now = new Date();

        let day = date.getDate();
        let month = date.toLocaleString('default', { month: 'long' });
        let year = date.getFullYear();

        let currentDate = `${day} ${month} ${year}`; 

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
            console.log(highlighted);
        }
        window.addEventListener('mouseup', highlightSelection);

        this.content = userSelect.toString();
        this.yourNotes = notes.innerText; 
        this.title = document.title; 
        this.time = currentDate;  
        this.author = window.location.host; 
        this.deathTime = now.getTime() + (14 * 24 * 60 * 60);
        this.index = initialBin.length; 
    }
}

const archiveTimeout = setTimeout(highlightDeath, 60000);

function highlightDeath(){
    if ( now.getTime() >= this.deathTime ) { 
        archiveBin.push(initialBin[this.index]);
        initialBin.splice(this.index, 1);
        this.deathTime = now.getTime() + (14 * 24 * 60 * 60);
    } else {
        console.log('this highlight still has time to live');
    }
}

const deathTimeout = setTimeout(highlighRealDeath, 60000);

function highlightRealDeath(){
    if ( now.getTime() >= this.deathTime) { 
        initialBin.splice(this.index, 1);
    } else {
        console.log('this highlight still has time to live');
    }
}







