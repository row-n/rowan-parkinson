<?php get_header(); ?>

	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">

			<div class="posts">
				<?php if ( have_posts() ) : ?>
					<ul class="home-list">
						<?php /* The loop */ ?>
						<?php while ( have_posts() ) : the_post(); ?>
							<?php get_template_part( 'content', get_post_format() ); ?>
						<?php endwhile; ?>
					</ul>
				<?php endif; ?>
			</div><!-- end div.posts -->

			<?php /* $pages = get_pages();
			foreach ($pages as $page_data) {
			    $content = apply_filters('the_content', $page_data->post_content);
			    $title = $page_data->post_title;
				$slug = $page_data->post_name;
			   	echo "<div class='page $slug'>";
				echo "<h2>$title</h2>";
				echo $content;
				echo "</div>";
			}
			*/ ?>

		</div><!-- #content -->
	</div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>