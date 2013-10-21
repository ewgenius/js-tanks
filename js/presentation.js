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
            this.slides[i].initialize = function () { }
    }

    this.currentSlide().initialize();
}

Presentation.prototype.gotTo = function(index) {
    this.currentIndex = index;
    this.slides.removeClass('current');
    $(this.slides[index]).addClass('current');
}

Presentation.prototype.currentSlide = function () {
    return this.slides[this.currentIndex];
}

Presentation.prototype.next = function () {
    this.currentIndex = (this.currentIndex + 1) % this.slidesCount;
    this.slides.removeClass('current');
    $(this.slides[this.currentIndex]).addClass('current');
}

Presentation.prototype.prev = function () {
    this.currentIndex = (this.currentIndex - 1) % this.slidesCount;
    this.slides.removeClass('current');
    $(this.slides[this.currentIndex]).addClass('current');
}
