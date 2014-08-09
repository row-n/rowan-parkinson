(function($) {

	var Model = Backbone.Model,
		View = Backbone.View,
		PageHome, PageAbout, PageContact, PagePosts,
		App, app, Router;

	// View for posts load
	PageHome = View.extend({
		el: '.home-list li',
		initialize: function() {

			var _this = this,
				$el,
				$container = $('#grid'),
				columnWidth = 0,
				columnsHeight = [],
				columns = 3,
				hasScrollbar = function() { return 0; };

			columnWidth = ( ( ( $container.innerWidth() - hasScrollbar() ) ) / columns );

			// Let's populate our columns array with empty values to avoid Nan error
			for( var i = 0; i < columns; i++ ) columnsHeight.push( 0 );

			this.$el.each( function( i, e ) {

				var currentColumn = i % columns,
					$next = $( e ).nextAll().eq( columns - 1 );

				// Apply CSS
				$( e ).css( {

					'opacity': 0,
					'left':	currentColumn * columnWidth,
					'width': columnWidth

				} );

				thisHeight = $( e ).outerHeight( false );

				// Increase the height of the column
				columnsHeight[ currentColumn ] += ( thisHeight );

				// Set the height of the element that will follow in that column
				$next.css( { 'top':	columnsHeight[ currentColumn ] } );

				setTimeout(function(){

					$( e ).addClass( 'fadeInUpBig' );

				},25 + ( i * 200 ));

			} );

		}
	});

	PageAbout = View.extend({
		el: '.home-list',
		initialize: function() {

			this.showContent();


		},
		showContent: function() {
			app.router.navigate('about', true);
			return false;
		}
	});

	PageContact = View.extend({
		el: '.home-list',
		initialize: function() {

			this.showContent();
		},
		showContent: function() {
			app.router.navigate('contact', true);
		}
	});

	PagePosts = View.extend({
		el: '.home-list',
		initialize: function(section) {
			var _this = this,
				$el,
				section = _this.$el.data('section');

			this.showContent(section);

			alert(section);

			return false;
		},
		showContent: function(section) {
			app.router.navigate(section, true);
		}
	});

	// View for navigable content
	SiteContent = View.extend({
		el: '.site-main',
		initialize: function() {
			var _this = this;

			this.pageHome = new PageHome();

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
		currentUri: '',
		pages: {},
		initialize: function() {
			window.app = this;

			this.siteContent = new SiteContent();
			this.router = new Router();

		},
		render: function() {

			var _this = this,
				$el,
				section = this.$el.data('section');

			console.log(section);

			this.router.addPageRoutes(section);

			Backbone.history.start({ pushState: true, root: '/' });

		},
		postClickHandler: function(evt, el) {
			var _this = this,
				$el,
				href = $(evt.currentTarget).attr('href'),
				id = href.replace(Site.basePath+'/', ''),
				$parent = $(evt.currentTarget).parent('li')
				$i = $parent.index();

			$parent
				.siblings('li')
				.toggleClass('fadeInUpBig fadeOutDownBig');

			$parent.animate({'top': 0});

			setTimeout( function () {

				$parent.animate({'left': '33.33%'});

				setTimeout( function () {

					$parent.toggleClass('open');

				}, 550 );

			}, 500 );

			this.pagePosts = new PagePosts();

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
		}
	});

	// Routing stuff
	Router = Backbone.Router.extend({
		routes: {
			'(/)': 'home',
			'about(/)': 'aboutPage',
			'contact(/)': 'contactPage',
			':section(/)': 'postPage'
		},
		initialize: function() {
			this.bind('all', this.onAll);
		},
		pageConstructor: function() {
			app.currentUri = Backbone.history.fragment;
		},
		home: function() {
			this.pageConstructor();
			app.page = new PageHome();
		},
		aboutPage: function() {
			this.pageConstructor();
			if ( ! app.page ) app.page = new PageAbout();
		},
		contactPage: function() {
			this.pageConstructor();
			if ( ! app.page ) app.page = new PageContact();
		},
		postPage: function(section) {
			this.pageConstructor();
			if ( ! app.page ) app.page = new PagePosts();
		},
		addPageRoutes: function(section) {
			switch ( section ) {
				case 'home':
				this.route('(/)', 'home');
				break;
				case 'about':
				this.route('(/)', 'about');
				break;
				case 'contact':
				this.route('(/)', 'contact');
				break;
				case 'posts':
				this.route('(/)(:section)(/)', 'posts');
				break;
			}
		}
	});

	$(document).ready(function() {

		app = new App();
		app.render();

	});

})(jQuery);