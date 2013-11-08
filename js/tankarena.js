var player;
var arena;
var Arena = function (container) {
    this.container = container;
    var stage = new PIXI.Stage(0xffffff);
    var renderer = PIXI.autoDetectRenderer(container.width(), container.height());

    this.stage = stage;
    this.renderer = renderer;
}

Arena.prototype.initialize = function () {
    this.container[0].appendChild(this.renderer.view);
    var self = this;

    var tanks = [];
    var missiles = []
    var grid = new Grid(this.container.width() / 20, this.container.height() / 20, 20);

    this.tanks = tanks;
    this.missiles = missiles;
    this.grid = grid;


    for (var i = 0; i < 1; i++) {
        var t = new Tank('red');
        t.sprite.position.x = 10 + 20 * ( Math.floor(Math.random() * (20 - 1 + 1)) + 1);
        t.sprite.position.y = 10 + 20 * ( Math.floor(Math.random() * (20 - 1 + 1)) + 1);
        t.rotate(t, Math.random() * 360);
        tanks.push(t);
    }

    if(!player)
        player = new Tank('green');
    player.sprite.position.x = 100;
    player.sprite.position.y = 100;
    tanks.push(player);

    for (var i = 0; i < tanks.length; i++)
        this.stage.addChild(tanks[i].sprite);

    var renderer = this.renderer;
    var stage = this.stage;

    this.animate = function() {
        requestAnimFrame(self.animate);
        renderer.render(stage);
        for(var i = 0; i < missiles.length; i++)
            missiles[i].move();

        for(var i = missiles.length - 1; i >= 0; i--)
            if(!missiles[i].active) {
                arena.stage.removeChild(missiles[i].sprite);
                missiles.splice(i, 1);
            }
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

    this.stop();

    this.animation = requestAnimFrame(self.animate);
    this.logic = setInterval(function () {
        self.step();
    }, 100);
}

Arena.prototype.stop = function() {
    clearInterval(this.logic);
    cancelAnimationFrame(this.animation);
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
    this.dx = 0;
    this.dy = 0;
    this.speed = 2;
    this.life = 1000;
    this.active = true;
}

Missile.prototype.move = function() {
    if(this.active) {
        this.sprite.position.x += this.dx * this.speed;
        this.sprite.position.y += this.dy * this.speed;
        this.life--;
        if(this.life <= 0){
            //arena.missiles.pop(this);
            this.active = false;
        }
    }
}

var Tank = function (color) {
    this.texture = new PIXI.Texture.fromImage('img/tank_' + color + '.png');
    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.speed = 10;
    this.direction = 0;
    this.actions = [];
    this.stepCounter = 0;
    this.steps = 10;
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

Tank.prototype.shoot = function (self) {
    var m = new Missile();
    m.dx = Math.sin(self.direction);
    m.dy = -Math.cos(self.direction);
    m.sprite.position.x = self.sprite.position.x + 4 * m.dx;
    m.sprite.position.y = self.sprite.position.y + 4 * m.dy;
    m.sprite.rotation = self.sprite.rotation;
    m.dx = Math.sin(self.direction);
    m.dy = -Math.cos(self.direction);
    arena.stage.addChild(m.sprite);
    arena.missiles.push(m);
}

Tank.prototype.step = function () {
    var plused = false;
    switch(this.stepCounter) {
        case 0:
            if(this.step0) {
                this.step0();
                break;
            } else
                this.stepCounter++;
                plused = true;
        case 1:
            if(this.step1) {
                this.step1();
                break;
            } else
                this.stepCounter++;
                plused = true;
        case 2:
            if(this.step2) {
                this.step2();
                break;
            } else
                this.stepCounter++;
                plused = true;
        case 3:
            if(this.step3) {
                this.step3();
                break;
            } else
                this.stepCounter++;
                plused = true;
        case 4:
            if(this.step4) {
                this.step4();
                break;
            } else
                this.stepCounter++;
                plused = true;
        case 5:
            if(this.step5) {
                this.step5();
                break;
            } else
                this.stepCounter++;
                plused = true;
        case 6:
            if(this.step6) {
                this.step6();
                break;
            } else
                this.stepCounter++;
                plused = true;
        case 7:
            if(this.step7) {
                this.step7();
                break;
            } else
                this.stepCounter++;
                plused = true;
        case 8:
            if(this.step8) {
                this.step8();
                break;
            } else
                this.stepCounter++;
                plused = true;
        case 9:
            if(this.step9) {
                this.step9();
                break;
            } else
                this.stepCounter++;
                plused = true;
    }
    if(!plused)
        this.stepCounter += 1;
    this.stepCounter %= this.steps;
}