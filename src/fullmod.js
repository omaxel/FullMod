(function ($) {

    var statusClasses = {
        showing: 'fullmod-showing',
        shown: 'fullmod-shown',
        hiding: 'fullmod-hiding',
        hidden: 'fullmod-hidden'
    };

    // Class append to body when the modal is shown
    var fullmodOpenClass = 'fullmod-open';
    var $body = $(document.body);


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

    if (typeof transitionEventName === 'undefined') {
        console.warn("No transitionend event found. Don' t use FullMod.");
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

        var runIfFunc = function (func, thisArg, params) {
            if (isFunc(func)) return func.call(thisArg, params);
            return null;
        };

        var shouldReturn = function (func, thisArg, params) {
            return runIfFunc(func, thisArg, params) === false;
        };

        //endregion

        var fullmod = {};

        if (this.length === 0) {
            console.warn('No jQuery object specified');
            return null;
        }

        fullmod.$element = this;

        //region Public methods

        fullmod.show = function (params) {
            if (fullmod.$element.hasClass(statusClasses.showing) || fullmod.$element.hasClass(statusClasses.shown)) return;
            if (shouldReturn(options.onShowing, fullmod, params)) return;


            transitionEventName && fullmod.$element.one(transitionEventName, function () {

                fullmod.$element
                    .removeClass(statusClasses.showing)
                    .addClass(statusClasses.shown);

                runIfFunc(options.onShown, fullmod);
            });

            fullmod.$element
                .removeClass(statusClasses.hidden)
                .addClass(statusClasses.showing)
                .css('top', 0);

            $body.addClass(fullmodOpenClass);
        };

        fullmod.hide = function (params) {
            if (fullmod.$element.hasClass(statusClasses.hiding) || fullmod.$element.hasClass(statusClasses.hidden)) return;
            if (shouldReturn(options.onHiding, fullmod, params)) return;

            transitionEventName && fullmod.$element.one(transitionEventName, function () {

                fullmod.$element
                    .removeClass(statusClasses.hiding)
                    .addClass(statusClasses.hidden);

                runIfFunc(options.onHidden, fullmod);
            });

            fullmod.$element
                .removeClass(statusClasses.shown)
                .addClass(statusClasses.hiding)
                .css('top', '');

            $body.removeClass(fullmodOpenClass);
        };

        //endregion

        this.find('.btn-close').click(function (e) {
            e.preventDefault();
            fullmod.hide();
        });

        fullmod.$element.addClass(statusClasses.hidden);

        return fullmod;
    };

}(jQuery));