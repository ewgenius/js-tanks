var Arena = function (container) {

    var stage = new PIXI.Stage(0xffffff);
    var renderer = PIXI.autoDetectRenderer(container.width(), container.height());
    container[0].appendChild(renderer.view);
    requestAnimFrame(animate);


    var tanks = [];
    var grid = new Grid(container.width() / 20, container.height() / 20, 20);

    this.tanks = tanks;
    this.grid = grid;


    var t = new Tank();
    t.sprite.position.x = 110;
    t.sprite.position.y = 110;
    tanks.push(t);


    stage.addChild(grid.graphics);
    for (var i = 0; i < tanks.length; i++)
        stage.addChild(tanks[i].sprite);

    function animate() {
        requestAnimFrame(animate);
        renderer.render(stage);
    }

    this.logic = 0;
}

Arena.prototype.step = function () {
    for (var i = 0; i < this.tanks.length; i++)
        this.tanks[i].step();
}

Arena.prototype.start = function () {
    var self = this;
    clearInterval(this.logic);
    this.logic = setInterval(function () {
        self.step();
    }, 1000);
}

var Grid = function (width, height, d) {
    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(1, 0xaaaaaa, 1);

    for (var x = 1; x < width; x++) {
        this.graphics.moveTo(x * d, 0);
        this.graphics.lineTo(x * d, height * d);
    }
    for (var y = 1; y < height; y++) {
        this.graphics.moveTo(0, y * d);
        this.graphics.lineTo(width * d, y * d);
    }
}


var Missile = function() {
    this.texture = new PIXI.Texture.fromImage('img/missile.png');
    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.direction = 0;
}


var Tank = function () {
    this.texture = new PIXI.Texture.fromImage('img/tank.png');
    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.direction = 0;
    this.tank = this;
}

Tank.prototype.moveForward = function () {
    if (this.direction == 0)
        this.sprite.position.y -= 20;
    else if (this.direction == 1)
        this.sprite.position.x -= 20;
    else if (this.direction == 2)
        this.sprite.position.y += 20;
    else if (this.direction == 3)
        this.sprite.position.x += 20;
}

Tank.prototype.rotateLeft = function () {
    this.sprite.rotation -= Math.PI / 2;
    this.direction = (this.direction + 1) % 4;
}

Tank.prototype.rotateRight = function () {
    this.sprite.rotation += Math.PI / 2;
    this.direction = (this.direction - 1) % 4;
}

Tank.prototype.shoot = function() {

}

Tank.prototype.step = function () {

}