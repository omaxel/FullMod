(function ($) {

    var classes = {
        showing: 'fullmod-showing',
        shown: 'fullmod-shown',
        hiding: 'fullmod-hiding',
        hidden: 'fullmod-hidden'
    };

    var transitionEventName = (function () {
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

        for (t in transitions) {
            if (el.style[ t ] !== undefined) {
                return transitions[ t ];
            }
        }
    })();

    if (typeof transitionEventName === "undefined") {
        console.warn("No transitionend event found. Don't use FullMod.");
        return;
    }

    $.fn.fullmod = function (options) {

        options = $.extend({
            onShowing: null,
            onShown: null,
            onHiding: null,
            onHidden: null
        }, options);

        //region Utils

        var isFunc = function (obj) {
            return typeof obj === 'function';
        };

        var runIfFunc = function (func) {
            if (isFunc(func)) return func();
            return null;
        };

        var shouldReturn = function (func) {
            return runIfFunc(func) === false;
        };

        //endregion

        var fullmod = {};

        if (this.length === 0) {
            console.warn("No jQuery object specified");
            return null;
        }

        fullmod.$element = this;

        //region Public methods

        fullmod.show = function () {
            if (fullmod.$element.hasClass(classes.showing) || fullmod.$element.hasClass(classes.shown)) return;
            if (shouldReturn(options.onShowing)) return;

            transitionEventName && fullmod.$element.one(transitionEventName, function () {

                fullmod.$element
                    .removeClass(classes.showing)
                    .addClass(classes.shown);

                runIfFunc(options.onShown);
            });

            fullmod.$element
                .removeClass(classes.hidden)
                .addClass(classes.showing)
                .css('top', 0);
        };

        fullmod.hide = function () {
            if (fullmod.$element.hasClass(classes.hiding) || fullmod.$element.hasClass(classes.hidden)) return;
            if (shouldReturn(options.onHiding)) return;

            transitionEventName && fullmod.$element.one(transitionEventName, function () {

                fullmod.$element
                    .removeClass(classes.hiding)
                    .addClass(classes.hidden);

                runIfFunc(options.onHidden);
            });

            fullmod.$element
                .removeClass(classes.shown)
                .addClass(classes.hiding)
                .css('top', '');

        };

        //endregion

        this.find('.btn-close').click(function (e) {
            e.preventDefault();
            fullmod.hide();
        });

        fullmod.$element.addClass(classes.hidden);

        return fullmod;
    };

}(jQuery));