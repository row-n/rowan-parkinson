var $ = require('jquery');
var jQuery = $;

(function($) {

  $(function() {

    var $window = $(window),
      $body = $('body'),
      $wrapper = $('.page');

      $window.on('load', function() {
        window.setTimeout(function() {
          $body.removeClass('is-loading');
        }, 100);
      });

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

  });

})(jQuery);
