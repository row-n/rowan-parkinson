/*
	Phugo - Photogallery Theme for Hugo
	by Pavel Kanyshev | github.com/aerohub
	It's based on Multiverse by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
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
			$('form').placeholder();

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

			// Global events.
				$body
					.on('click', function(event) {

						if ($body.hasClass('content-active')) {

							event.preventDefault();
							event.stopPropagation();

							$panels.trigger('---hide');

						}

					});

				$window
					.on('keyup', function(event) {

						if (event.keyCode == 27
						&&	$body.hasClass('content-active')) {

							event.preventDefault();
							event.stopPropagation();

							$panels.trigger('---hide');

						}

					});

		// Header.
			var $header = $('.header');

			// Links.
				$header.find('a').each(function() {

					var $this = $(this),
						href = $this.attr('href');

					// Internal link? Skip.
						if (!href
						||	href.charAt(0) == '#')
							return;

					// Redirect on click.
						$this
							.removeAttr('href')
							.css('cursor', 'pointer')
							.on('click', function(event) {

								event.preventDefault();
								event.stopPropagation();

								window.location.href = href;

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

		// Main.
			var $main = $('.content');

			// Poptrox.
				$main.poptrox({
					baseZIndex: 20000,
					caption: function($a) {

						var s = '';

						$a.nextAll().each(function() {
							s += this.outerHTML;
						});

						return s;

					},
					fadeSpeed: 300,
					onPopupClose: function() { $body.removeClass('modal-active'); },
					onPopupOpen: function() { $body.addClass('modal-active'); },
					overlayOpacity: 0,
					popupCloserText: '',
					popupHeight: 150,
					popupLoaderText: '',
					popupSpeed: 300,
					popupWidth: 150,
					selector: '.tile > a.tile__image',
					usePopupCaption: true,
					usePopupCloser: true,
					usePopupDefaultStyling: false,
					usePopupForceClose: true,
					usePopupLoader: true,
					usePopupNav: true,
					windowMargin: 50
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