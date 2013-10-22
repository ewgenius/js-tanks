var Presentation = function (container) {
    this.slides = container.children();
    this.currentIndex = 0;
    this.slidesCount = this.slides.length;
    for (var i = 0; i < this.slidesCount; i++) {
        if ($(this.slides[i]).hasClass('current'))
            this.currentIndex = i;
        if (window['initialize_' + i])
            this.slides[i].initialize = window['initialize_' + i];
        else
            this.slides[i].initialize = function () {}

        if (window['exit_' + i])
            this.slides[i].exit = window['exit_' + i];
        else
            this.slides[i].exit = function () {}
    }

    this.currentSlide().initialize();
}

Presentation.prototype.gotTo = function (index) {
    this.currentSlide().exit();
    this.currentIndex = index;
    this.slides.removeClass('current');
    $(this.slides[index]).addClass('current');
    this.currentSlide().initialize();
}

Presentation.prototype.currentSlide = function () {
    return this.slides[this.currentIndex];
}

Presentation.prototype.next = function () {
    this.gotTo((this.currentIndex + 1) % this.slidesCount);
}

Presentation.prototype.prev = function () {
    this.gotTo((this.currentIndex - 1) % this.slidesCount);
}
