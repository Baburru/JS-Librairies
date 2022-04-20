
var i = 0
var allCube = []
var pos_y = []
var st_y = []

/* 
var start_x = []
var start_y = []

var pixel_y = []
var pixel_x = []
var time 

var nb_pixel = 15

for (let i =0; i <= nb_pixel; i++) {
    start_x[i]=  Math.round(Math.random() * 1000)
    start_y[i]= 0
    pixel_y[i]= 0
    pixel_x[i]= 0
}



function tomber() {
    for (let i =0; i <= nb_pixel; i++) {
        var cube = document.createElement("div")
        cube.classList.add('cube_n' + i + '')
        cube.classList.add('neige')
        document.body.appendChild(cube)
        cube.style.left = start_x[i] + 'px'
    }
    time = setTimeout("tomber()", 10)
}

tomber()
 */



while (i < 200) {
    var cube = document.createElement("div")
    cube.setAttribute("id",'cube' + i)
    cube.classList.add('neige')
    cube.innerHTML = "|"
    cube.style.opacity = Math.random()
    cube.style.left = Math.round(Math.random() * window.innerWidth) + 'px'
    pos_y[i]= Math.random() * window.innerHeight
    st_y[i]=0.9 + Math.random()
    cube.style.top = st_y + 'px'
    document.body.appendChild(cube)
    allCube.push(cube)
    i++
}

falling()






function falling() {
    debugger
    for (let i =0; i < 200; i++) {
        pos_y[i] += 7

        if(pos_y[i] > window.innerHeight - 50){
            pos_y[i]= 0
        }

        document.getElementById("cube" + i).style.top = pos_y[i] + 'px';
        
    }

    time = setTimeout("falling()", 10)
}

