var text = document.getElementById('typo');
var splitText = text.innerText.split('');
var i = 0

debugger
text.innerHTML = ""

setInterval("addL()", 100)

function addL() {
    if (i < splitText.length) {
        text.innerHTML += splitText[i];
        i++
    }
}

