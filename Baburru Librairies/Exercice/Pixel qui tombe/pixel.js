
var i = 0
var allCube = []



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

/* function createCube() {
    const cube = document.createElement("div")
    cube.classList.add('cube_n' + i + '')
    cube.classList.add('neige')
    document.body.appendChild(cube)



    allCube.push(cube)
    i++

    let start = Date.now(); // remember start time

    let timer = setInterval(function () {
        // how much time passed from the start?
        let timePassed = Date.now() - start;

        if (timePassed >= 2000) {
            clearInterval(timer); // finish the animation after 2 seconds
            cube.style.opacity = 0
            return;
        }

        // draw the animation at the moment timePassed
        draw(timePassed);

    }, 20);

    // as timePassed goes from 0 to 2000
    // left gets values from 0px to 400px
    function draw(timePassed) {
        cube.style.top = timePassed / 5 + 'px';
        var math = Math.random()
        console.log(math)
    }
} */




