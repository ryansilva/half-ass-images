/*!
 * Half Ass Images - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2015 Ryan Silva
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.mediarocketdesign.com/projects/half-ass-images
 *
 * Version:  0.0.1
 *
 */

(function($, window, document) {
 
    $.fn.halfass = function(options) {

        var opts = $.extend({}, $.fn.halfass.defaults, options);
        var elements = this;
        var i;
        var len;

        function watcher() {
            
        }

        // Set placeholder image on half ass images
        for(i = 0, len = elements.length; i < len; i++) {

            if($(elements[i]).attr("src") === undefined ||
                $(elements[i]).attr("src") === false) {

                $(elements[i]).attr("src", opts.placeholder);
            }

        }

        return this;
    };

    $.fn.halfass.defaults = {
        effect          : "fade",
        loadAction      : "pageLoad"
        dataAttribute   : "original",
        placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
    };
 
}(jQuery, window, document));