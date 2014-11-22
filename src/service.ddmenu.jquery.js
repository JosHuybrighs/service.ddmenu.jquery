; (function ($, win, undefined) {

    $.DDMenu = function(element, options) {
        this.settings = {
            width: 0
        };
        this.dd = $(element);
        this._init(options);
    };

    $.DDMenu.prototype = {
        _init: function (options) {
            this.settings = $.extend({}, this.settings, options);
            var self = this;

            // Setup styles
            this.dd.addClass('ddMenu');
            var ddList = this.dd.find('> ul');
            ddList.addClass('ddMenuDropDown');
            if (this.settings.width != 0) {
                ddList.css({ width: this.settings.width });
            }

            // Bind event handlers
            this.dd.on('click.ddMenu', function (event) {
                // Close possible other open dropdowns
                var otherOpenObjs = $('.ddMenuOpen').not(self.dd);
                otherOpenObjs.removeClass('ddMenuOpen');

                self.dd.toggleClass('ddMenuOpen');
                event.stopPropagation();
            });
            $('html').on('click.ddMenu', function () {
                self.dd.removeClass('ddMenuOpen');
            });
        }
    };

    $.fn.ddmenu = function (options) {
        return this.each(function () {
            if ($(this).data('ddmenu-plugin')) return;
            var plugin = new $.DDMenu(this, options);
            $(this).data('ddmenu-plugin', plugin);
        });
    };

})(jQuery);
