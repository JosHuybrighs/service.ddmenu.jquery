/****************************************************************************************************** 
 * A jquery plugin implementing a dropdown menu
 * 
 * Version 1.0.0
 *
 * This plugin makes it easy to create individual, single-level dropdown menus on a web page.
 * The dropdown menu itself must be fully designed in HTML (as per an imposed container layout).
 * The plugin does't insert nor replaces elements in the DOM.
 * 
 * Usage: See http://code.cwwonline.be/serviceddmenujquery/
 *
 * Change history:
 *
 * Version 1.0.0 - First version.
 *
 * @requires jQuery 1.8.0 or later
 *
 * Copyright (c) Jos Huybrighs
 * code.cwwonline.be
 *
 * Licensed under the MIT license.
 * http://en.wikipedia.org/wiki/MIT_License
 *
 ******************************************************************************************************/

; (function ($, win, undefined) {

    var version = '1.0.0';
	
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
