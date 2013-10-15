var Presentation = function (container) {
    this.slides = container.children();
    this.currentIndex = 0;
    this.slidesCount = this.slides.length;
}

Presentation.prototype.next = function () {
    if (this.slidesCount > 0) {
        this.currentIndex = (this.currentIndex + 1) % this.slidesCount;
        this.slides.removeClass('current');
        $(this.slides[this.currentIndex]).addClass('current');
    }
}

Presentation.prototype.prev = function () {
    if (this.slidesCount > 0) {
        this.currentIndex = (this.currentIndex - 1) % this.slidesCount;
        this.slides.removeClass('current');
        $(this.slides[this.currentIndex]).addClass('current');
    }
}
