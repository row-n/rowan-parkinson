<li class="home-post">
	<a href="<?php the_permalink(); ?>" id="post-<?php the_ID(); ?>" <?php post_class(); ?> rel="bookmark">
		<div class="post-bg" <?php if ( has_post_thumbnail() ) : ?> style="background-image: url( <?php $img = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full'); echo $img[0]; ?> )"<?php endif; ?>></div>
		<div class="overlay"></div>
		<div class="gradient"></div>
		<header class="entry-header">

		<h2 class="entry-title">
			<span data-hover="<?php the_title(); ?>"><?php the_title(); ?></span>
		</h2>

		</header><!-- .entry-header -->

		<?php if ( is_search() ) : // Only display Excerpts for Search ?>
		<div class="entry-summary">
			<?php the_excerpt(); ?>
		</div><!-- .entry-summary -->
		<?php endif; ?>
	</a>
</li>