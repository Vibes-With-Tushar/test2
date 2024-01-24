let maxHistoryLength = 10;
let currentHistory = JSON.parse(sessionStorage.getItem('history')) || [];
i = 0;
function addToHistory(page, title, name) {
    let flag = 0;
    let entry = { page: page, title: title, by: name };

    if (currentHistory.length === maxHistoryLength) {
        currentHistory.push(entry);
        currentHistory.shift(); // Remove the oldest entry if history is full
        i = 0;
    }
    else {

        if (currentHistory == "") {
            console.log(entry);
            currentHistory.push(entry);

        }
        else {
            for (let j = 0; j < currentHistory.length; j++) {
                if (entry.title == currentHistory[j].title) {
                    i--;
                    console.log("same-  " + entry);
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                console.log("dif-" + entry);
                currentHistory.push(entry);
            }
        }
    }
    sessionStorage.setItem('history', JSON.stringify(currentHistory));

    i++;
}




function resetHistory() {
    currentHistory = [];
}


