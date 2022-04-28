const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const velocity = 3;
const startingAngle = 70;
const rad = 3;
const diam = rad * 2
const orange = '#ffa200'
const rouge ='#aa0000'
const jaune = '#ffff00'

function Ball() {
    this.x = Math.floor(Math.random() * canvas.width) + 10
    this.y = Math.floor(Math.random() * canvas.height) +10
    this.moveX = Math.floor(Math.cos(Math.PI / 180 * startingAngle) * velocity) 
    this.moveY = Math.floor(Math.sin(Math.PI / 180 * startingAngle) * velocity)
    this.color = jaune





    this.deplacement = function () {

        if (this.x > canvas.width - rad || this.x < rad) {
            this.moveX = -this.moveX
        }
        if (this.y > canvas.height - rad || this.y < rad) {
            this.moveY = -this.moveY
        }
        this.x += this.moveX
        this.y += this.moveY
        
    }
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = this.color
        ctx.fill();
        ctx.closePath();
    }


    this.collision = function () {
        balls.forEach(item => {
            if (this !== item) {

                let diffX = Math.abs(item.x - this.x)
                let diffY = Math.abs(item.y - this.y)
                if (diffX < diam && diffY < diam) 
                {
                    this.moveX = -this.moveX

                    var choose = Math.round(Math.random()*2)
                    
                    switch (choose) {
                        case 0 :
                            this.color = jaune
                            break;

                        case 1 :
                            this.color = orange
                            break;

                        case 2 :
                            this.color = rouge
                            break;
                    }
                }
            }
        });


    }
}

var balls = []

for (let i = 0; i < 100; i++) {
    balls[i] = new Ball
}

console.log(balls)





const drawMe = () => {
    ctx.clearRect(0, 0, 400, 300);
    balls.forEach(item => {
        item.deplacement()
        item.collision()
        item.draw()

    });

    requestAnimationFrame(drawMe)
}
requestAnimationFrame(drawMe)


