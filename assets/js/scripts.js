var $ = require('jquery');
var imagesloaded = require('imagesloaded');
var skel = require('skel-framework-npm');
var jquery = $;
var jQuery = $;

(function($) {

  skel.breakpoints({
    xlarge: '(max-width: 1680px)',
    large: '(max-width: 1280px)',
    medium: '(max-width: 980px)',
    small: '(max-width: 736px)',
    xsmall: '(max-width: 480px)'
  });

  $(function() {

    var $window = $(window),
      $body = $('body'),
      $wrapper = $('.page');

    // Hack: Enable IE workarounds.
      if (skel.vars.IEVersion < 12)
        $body.addClass('ie');

    // Touch?
      if (skel.vars.mobile)
        $body.addClass('touch');

    // Transitions supported?
      if (skel.canUse('transition')) {

        // Add (and later, on load, remove) "is-loading" class.
          $body.addClass('is-loading');

          $window.on('load', function() {
            window.setTimeout(function() {
              $body.removeClass('is-loading');
            }, 100);
          });

        // Prevent transitions/animations on resize.
          var resizeTimeout;

          $window.on('resize', function() {

            window.clearTimeout(resizeTimeout);

            $body.addClass('resizing');

            resizeTimeout = window.setTimeout(function() {
              $body.removeClass('resizing');
            }, 100);

          });

      }

    // Scroll back to top.
      $window.scrollTop(0);

    // Fix: Placeholder polyfill.
      // $('form').placeholder();

    // Panels.
      var $panels = $('.panel');

      $panels.each(function() {

        var $this = $(this),
          $toggles = $('[href="#' + $this.attr('id') + '"]'),
          $closer = $this.find('.close');

        // Closer.
          $closer
            .on('click', function(event) {
              $this.trigger('---hide');
            });

        // Events.
          $this
            .on('click', function(event) {
              event.stopPropagation();
            })
            .on('---toggle', function() {

              if ($this.hasClass('active'))
                $this.triggerHandler('---hide');
              else
                $this.triggerHandler('---show');

            })
            .on('---show', function() {

              // Hide other content.
                if ($body.hasClass('content-active'))
                  $panels.trigger('---hide');

              // Activate content, toggles.
                $this.addClass('active');
                $toggles.addClass('active');

              // Activate body.
                $body.addClass('content-active');

            })
            .on('---hide', function() {

              // Deactivate content, toggles.
                $this.removeClass('active');
                $toggles.removeClass('active');

              // Deactivate body.
                $body.removeClass('content-active');

            });

        // Toggles.
          $toggles
            .removeAttr('href')
            .css('cursor', 'pointer')
            .on('click', function(event) {

              event.preventDefault();
              event.stopPropagation();

              $this.trigger('---toggle');

            });

      });

    // Footer.
      var $footer = $('.panel');

      // Copyright.
      // This basically just moves the copyright line to the end of the *last* sibling of its current parent
      // when the "medium" breakpoint activates, and moves it back when it deactivates.
        $footer.find('.copyright').each(function() {

          var $this = $(this),
            $parent = $this.parent(),
            $lastParent = $parent.parent().children().last();

          skel
            .on('+medium', function() {
              $this.appendTo($lastParent);
            })
            .on('-medium', function() {
              $this.appendTo($parent);
            });

        });

        // Hack: Set margins to 0 when 'xsmall' activates.
          skel
            .on('-xsmall', function() {
              $main[0]._poptrox.windowMargin = 50;
            })
            .on('+xsmall', function() {
              $main[0]._poptrox.windowMargin = 0;
            });

  });

})(jQuery);
