const $ = require('jquery');
const imagesLoaded = require('imagesloaded');

const jQuery = $;

(() => {
  const $body = $('body');
  const $wrapper = $('.page');
  const $panels = $('.panel');

  imagesLoaded($wrapper, () => {
    window.setTimeout(() => {
      $body.removeClass('is-loading');
    }, 100);
  });

  $panels.each((index, element) => {
    const $this = $(element);
    const $toggles = $(`[href="#${$this.attr('id')}"]`);
    const $closer = $this.find('.close');

    // Closer.
    $closer.on('click', () => {
      $this.trigger('---hide');
    });

    // Events.
    $this.on('click', (event) => {
      event.stopPropagation();
    })
      .on('---toggle', () => {
        if ($this.hasClass('active')) {
          $this.triggerHandler('---hide');
        } else {
          $this.triggerHandler('---show');
        }
      })
      .on('---show', () => {
        // Hide other content.
        if ($body.hasClass('content-active')) {
          $panels.trigger('---hide');
        }
        // Activate content, toggles.
        $this.addClass('active');
        $toggles.addClass('active');
        // Activate body.
        $body.addClass('content-active');
      })
      .on('---hide', () => {
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
      .on('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        $this.trigger('---toggle');
      });
  });
})(jQuery);
