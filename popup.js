const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const d = new Date();

chrome.storage.sync.get(["bins"]).then((data) => {
    console.log(data.bins[0].contents[0]);
    let n = data.bins[0].contents[0].length;
    let display = document.getElementById('display');

    let highlights = data.bins[0].contents[0];
    highlights.forEach((highlight) => {
        var highlightDiv = document.createElement('div');
        display.appendChild(highlightDiv); 

        var content = document.createElement('h1');
        content.className = 'content';
        content.innerText = highlight.content;
        highlightDiv.appendChild(content); 

        var notes = document.createElement('h2');
        notes.className = 'notes';
        if (highlight.yourNotes != ""){
            notes.innerText = `Notes: ${highlight.yourNotes}`;
            notes.contentEditable = 'true';
        } else {
            notes.innerText = highlight.yourNotes;
        }
        highlightDiv.appendChild(notes); 

        var info = document.createElement('span');
        highlightDiv.appendChild(info); 
        info.className = 'info';

        var title = document.createElement('h4');
        title.className = 'title';
        title.innerText = `${highlight.title} |`;
        info.appendChild(title); 

        var time = document.createElement('h4');
        time.className = 'author';
        time.innerText = `${highlight.time} |`;
        info.appendChild(time); 

        var author = document.createElement('h4');
        author.className = 'author';
        author.innerText = `${highlight.author}`;
        info.appendChild(author); 

        var archiveCountdown = document.createElement('div');
        info.appendChild(archiveCountdown); 
        archiveCountdown.className = 'archive-countdown';

        var boxImg = document.createElement('img');
        boxImg.src = 'images/archive.png';
        boxImg.style.height = '24px';
        boxImg.style.transform = "translateY(-5px)";
        archiveCountdown.appendChild(boxImg); 

        let deathDays = Math.round((highlight.deathTime - d.getTime()) / day);
        console.log(deathDays)

        var deathTime = document.createElement('h4');
        deathTime.className = 'days';
        deathTime.innerText = deathDays;
        archiveCountdown.appendChild(deathTime); 

        let counter = document.getElementById('counter');
        counter.innerText = `(${data.bins[0].contents[0].length})`;  

        var personalBins = document.getElementById('personal-bins');
        var pbHighlight = document.getElementById('pb-highlight');

        highlightDiv.addEventListener('click', (e) => {
            highlightDiv.style.backgroundColor = 'yellow';
                document.body.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowRight' && e.shiftKey) {
                        document.getElementById('arrow').style.transform = "rotate(90deg)";
                        personalBins.style.backgroundColor = 'yellow';
                            document.getElementById('initial-bin').style.backgroundColor = 'white';
                            document.body.addEventListener('keydown', (e) => {
                                if (e.key === 'ArrowDown') {
                                    personalBins.style.backgroundColor = 'white';
                                    pbHighlight.style.backgroundColor = 'yellow';
                                }
                                document.body.addEventListener('keydown', (e) => {
                                    if (e.key === 'Enter') {
                                        var personalDisplay = document.getElementById('display2');
                                        personalDisplay.appendChild(highlightDiv);
                                        personalDisplay.style.display = 'flex'
                                        personalDisplay.style.opacity = '100%';
                                        personalDisplay.style.zIndex = '100';
                                        display.style.display = 'none';
                                        archiveCountdown.style.display = 'none';
                                    }
                                });
                            }); 
                        }
                });
           });
    });
}); 

let add = document.getElementById('add');
let newBinName = '';
let x = document.getElementById('crossHelp');
let instructions = document.getElementById('instructions');
let help = document.getElementById('help');
let initialBin = document.getElementById('initial-bin');
let personalBins = document.getElementById('personal-bins');
let pbHighlight = document.getElementById('pb-highlight');
let arrow = document.getElementById('arrow');
let display = document.getElementById('display');
let personalDisplay = document.getElementById('display2');
let archive = document.getElementById('archive');

pbHighlight.addEventListener('click', (e) => {
    pbHighlight.style.backgroundColor = 'yellow';
    archive.style.backgroundColor = 'white';
});

archive.addEventListener('click', (e) => {
    archive.style.backgroundColor = 'yellow';
    initialBin.style.backgroundColor = 'white';
    personalBins.style.backgroundColor = 'white';
    pbHighlight.style.backgroundColor = 'white';
});

add.addEventListener('click', (e) => {
    var newBin= document.createElement('div');
    pbHighlight.appendChild(newBin); 
    newBin.contentEditable = true;
    newBin.focus();
    newBin.className = 'naming'
    newBin.innerText = 'Enter bin name';

    initialBin.style.backgroundColor = 'white';
    personalBins.style.backgroundColor = 'yellow';
    pbHighlight.style.backgroundColor = 'white';
    pbHighlight.style.display = 'block';
    arrow.style.transform = "rotate(90deg)";
    
    newBin.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            newBin.blur();
            newBinName = newBin.innerText;
            console.log(newBinName);
            personalBins.style.backgroundColor = 'white';

            chrome.storage.sync.get('bins', ({bins = []}) => {
                console.log(bins);
                bins.push({name: newBinName, contents:[]});
            }); 
            
        }
    });

});

x.addEventListener('click', (e) => {
    instructions.style.display = 'none';
})

help.addEventListener('click', (e) => {
    instructions.style.display = 'block';
})

initialBin.addEventListener('click', (e) => {
    console.log('initial bin selected');
    initialBin.style.backgroundColor = 'yellow';
    personalBins.style.backgroundColor = 'white';
    pbHighlight.style.backgroundColor = 'white';
    pbHighlight.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
    personalDisplay.style.display = 'none';
    display.style.display = 'flex';
});

personalBins.addEventListener('click', (e) => {
    console.log('personal bin selected');
    initialBin.style.backgroundColor = 'white';
    personalBins.style.backgroundColor = 'yellow';
    pbHighlight.style.backgroundColor = 'yellow';
    pbHighlight.style.display = 'block';
    arrow.style.transform = 'rotate(90deg)';
    personalDisplay.style.display = 'flex';
    display.style.display = 'none';
})