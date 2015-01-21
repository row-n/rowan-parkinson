<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" <?php language_attributes(); ?>> <!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<!-- <link href='http://fonts.googleapis.com/css?family=Lato:400,700,900|Quicksand:300,400' rel='stylesheet' type='text/css'> -->
	<link rel="stylesheet" type="text/css" href="http://i.icomoon.io/public/temp/9ec2c786e7/UntitledProject1/style.css">
	<script type="text/javascript" src="<?php bloginfo( 'template_url' ); ?>/assets/js/min/modernizr.min.js"></script>

	<?php wp_head(); ?>
</head>

<body data-base-url="<?= site_url(); ?>" <?php body_class(); ?>>
	<div class="loading"></div><!-- end div.loading -->
	<div id="page" class="hfeed site">
		<header id="masthead" class="site-header" role="banner">
			<div class="header-banner">
				<a class="home-link" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home">
					<h1 class="site-title" title="<?php bloginfo( 'name' ); ?>"><?php bloginfo( 'name' ); ?></h1>
					<p class="site-description"><?php bloginfo( 'description' ); ?></p>
				</a>

				<a href="javascript:void(0);" class="handle"></a>

				<div id="sb-search" class="sb-search">
					<form role="search" method="get" class="search-form" id="searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>">
						<input class="sb-search-input" placeholder="Enter your search term..." type="text" value="" name="s" id="search">
						<input class="sb-search-submit" type="submit" value="">
						<span class="sb-icon-search"></span>
					</form>
				</div>

			</div><!-- end div.header-banner -->

			<nav id="site-navigation" class="navigation main-navigation" role="navigation">
				<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_class' => 'nav-menu' ) ); ?>
			</nav><!-- #site-navigation -->

		</header><!-- #masthead -->

		<div id="main" class="site-main">
