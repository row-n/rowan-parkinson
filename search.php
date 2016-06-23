<?php get_header(); ?>

	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">

				<?php if ( have_posts() ) : ?>

					<article class="page">

						<header class="entry-header">
							<h1 class="entry-title">
							<?php /* printf( __( 'Search Results for: %s', 'rowanparkinson' ), get_search_query() ); */ ?>
							<?php echo $wp_query->found_posts; ?> <?php _e( 'Search Results Found For', 'twentythirteen' ); ?>: "<?php the_search_query(); ?>"
							</h1>
						</header>

						<?php /* The loop */ ?>
						<?php while ( have_posts() ) : the_post(); ?>
							<?php get_template_part( 'content', get_post_format() ); ?>
						<?php endwhile; ?>

						<?php twentythirteen_paging_nav(); ?>

						</div><!-- end div.page -->

					</article><!-- end article.page -->
				<?php else : ?>
					<?php /* get_template_part( 'content', 'none' ); */ ?>

					<article id="post-0" class="page post no-results not-found">

						<header class="entry-header">
							<h1 class="entry-title"><?php _e( 'Nothing Found', 'twentythirteen' ); ?></h1>
						</header>

						<div class="entry-content">
							<p><?php _e( 'Sorry, but nothing matched your search criteria. Please try again with some different keywords.', 'rowanparkinson' ); ?></p>
							<?php get_search_form(); ?>
						</div><!-- .entry-content -->

					</article><!-- end article.page -->

				<?php endif; ?>

		</div><!-- #content -->
	</div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>