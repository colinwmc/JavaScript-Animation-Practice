window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 800;

    class Game {
        constructor(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemyInterval = 1000;
            this.enemytimer = 0;
        }
        update(deltaTime) {
            this.enemies = this.enemies.filter(object => !object.markedForDeletion);
            if (this.enemytimer > this.enemyInterval) {
                this.#addNewEnemy();
                this.enemytimer = 0;
            } else {
                this.enemytimer += deltaTime;
            }
            this.enemies.forEach(object => object.update());
        }
        draw() {
            this.enemies.forEach(object => object.draw(ctx));
        }
        #addNewEnemy() {
            this.enemies.push(new Enemy(this));
        }
    }

    class Enemy {
        constructor(game) {
            this.game = game;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height;
            this.width = 100;
            this.height = 100;
            this.markedForDeletion = false;
        }
        update() {
            this.x--;
            if(this.x < 0 - this.width){
                this.markedForDeletion = false;
            }
        }
        draw(ctx) {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    const game = new Game(ctx, canvas.width, canvas.height);
    let lastTime = 1;
    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    };
    animate(0);
});