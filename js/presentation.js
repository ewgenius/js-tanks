var Presentation = function (container) {
    var self = this;
    this.slides = container.children('.slide');
    this.controls = container.children('.controls');
    this.currentIndex = 0;
    this.slidesCount = this.slides.length;
    for (var i = 0; i < this.slidesCount; i++) {
        if ($(this.slides[i]).hasClass('current'))
            this.currentIndex = i;
        if (window['initialize_' + i])
            this.slides[i].initialize = window['initialize_' + i];
        else
            this.slides[i].initialize = function () {
            }

        if (window['exit_' + i])
            this.slides[i].exit = window['exit_' + i];
        else
            this.slides[i].exit = function () {
            }
        var a = $('<a href="#" class="link">' + i + '</a>');
        this.controls.children('a.next').before(a);
        a[0].ind = i;
        a.click(function () {
            self.gotTo(this.ind);
        })
    }

    this.gotTo(this.currentIndex);
}

Presentation.prototype.gotTo = function (index) {
    if (index < 0 || index >= this.slidesCount)
        return;
    var self = this;
    if (index != this.currentIndex) {
        this.currentSlide().exit();
        this.currentIndex = index;
        this.slides.removeClass('current');
        $(this.slides[index]).addClass('current');
        this.currentSlide().initialize();
    }

    this.controls.children('a.prev').unbind('click');
    if (this.currentIndex != 0)
        this.controls.children('a.prev').click(function () {
            self.prev();
        });

    this.controls.children('a.next').unbind('click');
    if (this.currentIndex != this.slidesCount - 1)
        this.controls.children('a.next').click(function () {
            self.next();
        });

    this.controls.children('a.link').removeClass('selected');
    $(this.controls.children('a.link')[this.currentIndex]).addClass('selected');
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
