(function($) {

	var Model = Backbone.Model,
		View = Backbone.View,
		HomePostLoad,
		App, app, Router;

	// View for posts load
	HomePostLoad = View.extend({
		el: '.home-post',
		initialize: function() {
			var _this = this,
				$el,
				$container = $('#grid');

			this.$el.css({ 'opacity': 0 });

			$('.loading').show();

			$container.waitForImages().done(function() {

				var $post = $('.home-post');

				$('.loading').hide();

				$post.each( function(i, el) {

					setTimeout(function(){
						$( el ).addClass( 'fadeInUpBig' ).css({ 'opacity': 1 });
					},25 + ( i * 200 ));

				});
			});
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
			var _this = this,
				$el;

			if (this.$el.hasClass('home')) {

				this.homePostLoad = new HomePostLoad();

			};

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
				.siblings('li')
				.removeClass('active height width fadeInUpBig fadeOutDownBig')
				.addClass('fadeOutDownBig');

			setTimeout(function() {
				window.location = Site.basePath + '/' + id;
			}, 1000);

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