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
        var win = $(window);
        var i;
        var len;
        var halfAss;

        // Set placeholder image on half ass images
        for(i = 0, len = elements.length; i < len; i++) {

            if($(elements[i]).attr("src") === undefined ||
                $(elements[i]).attr("src") === false) {

                $(elements[i]).attr("src", opts.placeholder);
            }

        }

        function HalfAss() {

            var instance = this;
            var imagesLoaded = false;

            function initialize() {

                // listener
                instance.listeners();

            };

            this.listeners = function() {

                // If all images have not loaded
                if(imagesLoaded === false) {

                    $(window)
                        .on({
                            scroll: instance.elementLoop
                        });

                }

            };

            this.elementLoop = function() {

                console.log(imagesLoaded);

                for(i = 0, len = elements.length; i < len; i++) {

                    instance.inViewport($(elements[i]));

                }

            };

            this.inViewport = function(e) {

                var winHeight = window.innerHeight ? window.innerHeight : win.height()
                var imageOffset = e.offset().top;
                var fold = (imageOffset - winHeight) - opts.threshold;
                var ogSrc = e.data(opts.dataAttribute);

                // Window scroll check
                if(win.scrollTop() >=  fold) {

                    // Load image
                    e.attr("src", ogSrc);

                    // Check to see if all
                    // images have loaded
                    instance.loadingComplete();
                    
                }

            };

            this.loadingComplete = function(e) {

                var el = $(".half-ass").last();

                // All images loaded
                if(el.attr("src") === el.data(opts.dataAttribute)) {

                    // Stop scroll even from firing
                    $(window).unbind('scroll');

                    // Images loaded
                    imagesLoaded = true;
                }

            };

            initialize();

        };

        $(document).ready(function() {
            halfAss = new HalfAss();
        });

        return this;
    };

    $.fn.halfass.defaults = {
        effect          : "none",
        threshold       : 0,
        loadAction      : "pageLoad",
        dataAttribute   : "original",
        placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
        afterLoaded     : function() {}
    };
 
}(jQuery, window, document));