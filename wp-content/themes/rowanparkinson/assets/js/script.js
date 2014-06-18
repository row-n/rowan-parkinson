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
				$el;

			this.$el.each( function(i, el) {
			    $( el ).css({ 'opacity': 0 });
			    setTimeout(function(){
			       $( el ).addClass( 'fadeInUpBig' );
			    },25 + ( i * 200 ));
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

			this.homePostLoad = new HomePostLoad();
			this.openPosts = new OpenPosts();

			this.render();
		}
	});

	// 'global' App view
	App = View.extend({
	    el: 'body',
	    events: {
      		// 'click .posts a': 'postClickHandler',
      		'click a.handle': 'showMenu',
      		'click .site-main': 'hideMenu'
		},
		initialize: function() {
			window.app = this;

			this.siteContent = new SiteContent();
			this.router = new Router();

		},
		// postClickHandler: function(evt) {
		// 	var href = $(evt.currentTarget).attr('href'),
		// 		id = href.replace(Site.basePath+'/', '');

		// 	if ( this.openPosts ) {
		// 		app.router.navigate(id, true);
		// 	} else {
		// 		window.location = Site.basePath + '/' + id;
		// 	}

		// 	return false;
		// },
		showMenu: function(evt) {
			evt.preventDefault;

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
	    showPostsPage: function(id) {
	    	var _this = this,
				href = Site.basePath + '/' + id,
				$container = $('<div>');

			// console.log('post');
			console.log(href);

			this.$el.attr('class', id);

      		$container.load(href, function(data) {
		        var $payload = $(data).find('.post-content').children();

		        // _this.$('.site-content').html($payload);

			});

	    }
	});

	// Routing stuff
	Router = Backbone.Router.extend({
		routes: {
			'(/)': 'home',
			':id(/)': 'postsPage'
		},
		home: function() {
			app.showHomePage();
		},
		postsPage: function(id) {
			app.showPostsPage(id);
		}
	});

	$(document).ready(function() {

		app = new App();
		app.render();

		Backbone.history.start({ pushState: true, root: '/' });

	});

})(jQuery);