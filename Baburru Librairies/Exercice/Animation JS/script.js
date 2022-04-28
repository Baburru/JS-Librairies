var text = document.getElementById('typo');
var pattern = ["|","/","_","\\"]
var splitText = text.innerText.split('');

var pos_x = 0


text.innerHTML = ""



function addL() {
    var i = 0
    var ch;

        if (pattern[i]) {
            ch = pattern[i]
            i++
        }
        

    text.innerHTML = ch;

    setTimeout("addL()", 300)
}

addL()
//setInterval("suppL()", 420)

// function suppL() {
//     pos_x += 10
//     text.innerHTML = text.innerHTML.substring(1)
//     text.style.left = pos_x + 'px'
// }




