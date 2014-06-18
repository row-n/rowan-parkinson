(function($) {

	var Model = Backbone.Model,
		View = Backbone.View,
		HomePostLoad,
		App, app, Router;

	// View for posts load
	HomePostLoad = View.extend({
		el: '.home-post',
		events: {
			// 'mouseenter a.post': 'hoverPostOn',
			// 'mouseleave a.post': 'hoverPostOff'
		},
		initialize: function() {
			var _this = this,
				$el;

			this.$el.each( function(i, el) {
			    $( el ).css({ 'opacity': 0 });
			    setTimeout(function(){
			       $( el ).addClass( 'fadeInUpBig' );
			    },25 + ( i * 200 ));
			});
		},
		hoverPostOn: function(evt) {
			var _this = $(evt.currentTarget);

			TweenMax.to(_this.find('.post-bg'), 30, {scale:1.5, ease:Linear.easeNone });
		},
		hoverPostOff: function(evt) {
			var _this = $(evt.currentTarget);

			TweenMax.to(_this.find('.post-bg'), 2, {scale:1, ease:Cubic.easeInOut });
		}
	});

	OpenPosts = View.extend({
		el: '.home-list',
		events: {
			'click a': 'openPostsPage'
		},
		openPostsPage: function(evt) {
			var href = $(evt.currentTarget).attr('href'),
				id = href.replace(Site.basePath+'/', '');

			// console.log(id);

			this.expandPost();

			return false;
		},
		expandPost: function() {

			this.parent('li').addClass('open-post');

			this.showContent();
		},
		showContent: function() {
			// app.router.navigate(id, true);
		}
	});

	// View for navigable content
	SiteContent = View.extend({
		el: '.site-main',
		initialize: function() {
			var _this = this;

			this.homePostLoad = new HomePostLoad();
			this.openPosts = new OpenPosts();

			this.render();
		}
	});

	// 'global' App view
	App = View.extend({
	    el: 'body',
	    events: {
      		'click .posts a': 'postClickHandler',
      		'click a.handle': 'showMenu',
      		'click .site-main': 'hideMenu'
		},
		initialize: function() {
			window.app = this;

			this.siteContent = new SiteContent();
			// this.router = new Router();

		},
		postClickHandler: function(evt) {
			var _this = this,
				href = $(evt.currentTarget).attr('href'),
				id = href.replace(Site.basePath+'/', ''),
				$parent = $(evt.currentTarget).parent('li');

			evt.preventDefault();

			$parent
				.addClass('open')
				.siblings('li')
				.removeClass('active height width fadeInUpBig fadeOutDownBig')
				.addClass('fadeOutDownBig');

			if ($parent.index() >= 3) {
				var $prevParent = $parent.prev('li');

				setTimeout(function() {
					$parent
						.siblings('li')
						.addClass('height');
				}, 300);

				// $parent.each(function(i, el) {
				// 	if (i % 2 === 0) {

				// 		$prevParent
				// 			.prevAll('li')
				// 			.addClass('hide');
				// 	}
				// });

				setTimeout(function() {
					$parent
						.addClass('active')
						.siblings('li')
						.addClass('width');
				}, 800);
			} else {
				setTimeout(function() {
					$parent
						.addClass('active')
						.siblings('li')
						.addClass('width');
				}, 400);
			}

			// if ($(evt.currentTarget).parent('li').hasClass('active')) {
			// 	return false;
			// } else {
			// 	this.$el.each( function(i, el) {
			// 	    $( el ).css({ 'opacity': 0 });
			// 	    setTimeout(function(){
			// 	       $( el ).addClass( 'fadeOutDownBig' );
			// 	    },25 + ( i * 200 ));
			// 	});
			// }

			// if ( this.openPosts ) {
			// 	app.router.navigate(id, true);
			// } else {
			// 	window.location = Site.basePath + '/' + id;
			// }

			return false;
		},
		showMenu: function(evt) {
			evt.preventDefault();

			var $el = $(evt.target);

			$el.toggleClass('active');

			$('#site-navigation').toggleClass('open');
		},
		hideMenu: function() {
			$('.handle').removeClass('active');
			$('#site-navigation').removeClass('open');
		},
		showHomePage: function() {
			var _this = this,
				href = Site.basePath + '/',
				$container = $('<div>');

			console.log('home');

			this.$el.attr('class', 'home');

			$container.load(href, function(data) {
		        var $payload = $(data).find('.site-content').children();

		        // _this.$('.site-content').html($payload);

			});

	    },
	    showAboutPage: function() {
	    	var _this = this,
				href = Site.basePath + '/' + id,
				$container = $('<div>');

			console.log(href);

			this.$el.attr('class', id);


	    },
	    showContactPage: function() {
	    	var _this = this,
				href = Site.basePath + '/' + id,
				$container = $('<div>');

			console.log(href);

			this.$el.attr('class', id);


	    }
	  //   showPostsPage: function(id) {
	  //   	var _this = this,
			// 	href = Site.basePath + '/' + id,
			// 	$container = $('<div>');

			// // console.log('post');
			// console.log(href);

			// this.$el.attr('class', id);

   //    		$container.load(href, function(data) {
		 //        var $payload = $(data).find('.post-content').children();

		 //        // _this.$('.site-content').html($payload);

			// });

	  //   }
	});

	// Routing stuff
	Router = Backbone.Router.extend({
		routes: {
			'(/)': 'home',
			'about(/)': 'aboutPage',
			'contact(/)': 'contactPage'
		},
		home: function() {
			app.showHomePage();
		},
		aboutPage: function(id) {
			app.showAboutPage(id);
		},
		contactPage: function(id) {
			app.showContactPage(id);
		}
	});

	$(document).ready(function() {

		app = new App();
		app.render();

		Backbone.history.start({ pushState: true, root: '/' });

	});

})(jQuery);