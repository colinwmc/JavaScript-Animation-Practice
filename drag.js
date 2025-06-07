/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 700;
let mousex = 0;
let mousey = 0;

let canvasPosition = canvas.getBoundingClientRect();

class Object {
    constructor(x, y) {
        this.width = 20;
        this.height = 20;
        this.x = x;
        this.y = y;
        this.focused = false;
    }

    update() {

        window.addEventListener('click', function (e) {
            if(true){
                this.focused=true;
                if(this.focused){
                    console.log('here')
                    ctx.fillStyle = "green";
                }
            }
        });

    }

    draw() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const objects = [new Object(canvas.width/2, canvas.height / 2), new Object(canvas.width/2, canvas.height / 3)];

// window.addEventListener('mousemove', function (e) {
//     mousex = e.x;
//     mousey = e.y;
// });

function createAnimation(e) {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < objects.length; i++) {
        objects[i].update();
        objects[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();