var presentation;
var arena;

$(document).ready(function () {
    presentation = new Presentation($('#presentation'));
    arena = new Arena($('#slide1 .arena'));
    $('.description').find('.button').click(function () {
        // arena.tanks[0].step =
        console.info(eval($(this).parent().find('.code').val()));
    });
    arena.start();
})
