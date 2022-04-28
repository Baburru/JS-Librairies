var pixel = document.createElement("div")
pixel.classList.add('circle')
document.body.appendChild(pixel)

function mousemove(event) {
    next_x = event.pageX - 30
    next_y = event.pageY - 30
    pixel.style.top = next_y + 'px'
    pixel.style.left = next_x + 'px'

}

window.addEventListener('mousemove', mousemove);



