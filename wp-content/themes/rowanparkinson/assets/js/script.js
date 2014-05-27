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
			       $( el ).addClass( 'fadeInUp' );
			    },500 + ( i * 500 ));
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

			app.router.navigate(id, true);
			return false;
		},
		setState: function(activePost) {
			console.log(activePost);

			if (activePost) {
				this.$('.home-post').removeClass('active').addClass('inactive');
				this.$('.home-post.' + activePost + '-nav').removeClass('inactive').addClass('active');              
			} else {
				this.$('.home-post').removeClass('active inactive');
			}
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
		showHomePage: function() {
			var _this = this,
				href = Site.basePath + '/',
				$container = $('<div>');

			console.log('home');

			this.$el.attr('class', 'home');
			this.openPosts.setState(false);

			$container.load(href, function(data) {
		        var $payload = $(data).find('.site-content').children();

		        _this.$('.site-content').html($payload);

			});			

	    },
	    showPostsPage: function(id) {
	    	var _this = this,
				href = Site.basePath + '/' + id,
				$container = $('<div>');

			// console.log('post');
			console.log(href);

			this.$el.attr('class', id);
			this.openPosts.setState(id);

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