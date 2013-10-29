var Arena = function (container) {
    this.container = container;
    var stage = new PIXI.Stage(0xffffff);
    var renderer = PIXI.autoDetectRenderer(container.width(), container.height());

    this.stage = stage;
    this.renderer = renderer;
}

Arena.prototype.initialize = function () {
    this.container[0].appendChild(this.renderer.view);
    this.animation = requestAnimFrame(animate);

    var tanks = [];
    var grid = new Grid(this.container.width() / 20, this.container.height() / 20, 20);

    this.tanks = tanks;
    this.grid = grid;


    for (var i = 0; i < 10; i++) {
        var t = new Tank();
        t.sprite.position.x = 10 + 20 * ( Math.floor(Math.random() * (20 - 1 + 1)) + 1);
        t.sprite.position.y = 10 + 20 * ( Math.floor(Math.random() * (20 - 1 + 1)) + 1);
        t.rotate(t, Math.random() * 360);
        tanks.push(t);
    }

    //this.stage.addChild(grid.graphics);
    for (var i = 0; i < tanks.length; i++)
        this.stage.addChild(tanks[i].sprite);

    var renderer = this.renderer;
    var stage = this.stage;

    function animate() {
        requestAnimFrame(animate);
        renderer.render(stage);
    }

    this.logic = 0;
}

Arena.prototype.exit = function () {
    cancelAnimationFrame(this.animation);
    clearInterval(this.logic);
    this.renderer = null;
    this.stage = null;
    this.tanks = null;
    $(this.container).children().remove();
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


var Missile = function () {
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
    this.speed = 10;
    this.direction = 0;
    this.actions = [];
}

Tank.prototype.moveForward = function (self) {
    self.sprite.position.x += self.speed * Math.sin(self.direction);
    self.sprite.position.y -= self.speed * Math.cos(self.direction);
}

Tank.prototype.rotate = function (self, angle) {
    self.direction += angle * Math.PI / 180;
    if (self.direction >= 2 * Math.PI)
        self.direction -= 2 * Math.PI;
    if (self.direction < 0)
        self.direction += 2 * Math.PI;
    self.sprite.rotation = self.direction;
}

Tank.prototype.shoot = function () {

}

Tank.prototype.step = function () {
    //for(var i = 0; i < this.actions.length; i++)
    //this.actions[i].method(this.actions[i].arg);
}