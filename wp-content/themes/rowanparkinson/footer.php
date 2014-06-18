<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content and the closing of the #main and #page div elements.
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
 */
?>

		</div><!-- #main -->
		<footer id="colophon" class="site-footer" role="contentinfo">
			<?php get_sidebar( 'main' ); ?>

			<div class="site-info">
				<?php do_action( 'twentythirteen_credits' ); ?>
				<!-- <a href="<?php echo esc_url( __( 'http://wordpress.org/', 'twentythirteen' ) ); ?>" title="<?php esc_attr_e( 'Semantic Personal Publishing Platform', 'twentythirteen' ); ?>"><?php printf( __( 'Proudly powered by %s', 'twentythirteen' ), 'WordPress' ); ?></a> -->
				<p>&copy; Rowan Parkinson <?php echo date("Y") ?></p>
			</div><!-- .site-info -->
		</footer><!-- #colophon -->
	</div><!-- #page -->

	<?php wp_footer(); ?>
	<script type="text/javascript" src="<?php bloginfo( 'template_url' ); ?>/assets/js/classie.js"></script>
	<script type="text/javascript" src="<?php bloginfo( 'template_url' ); ?>/assets/js/uisearch.js"></script>

	<script type="text/javascript">
		var Site = {
		  basePath: document.body.getAttribute('data-base-url'),
		  userAgent: navigator.userAgent,
		  platform: navigator.platform
		};

		new UISearch( document.getElementById( 'sb-search' ) );

	</script>

	<script type="text/javascript" src="<?php bloginfo( 'template_url' ); ?>/assets/js/min/tweenmax.min.js"></script>
	<script type="text/javascript" src="<?php bloginfo( 'template_url' ); ?>/assets/js/underscore.js"></script>
	<script type="text/javascript" src="<?php bloginfo( 'template_url' ); ?>/assets/js/backbone.js"></script>
	<script type="text/javascript" src="<?php bloginfo( 'template_url' ); ?>/assets/js/script.js"></script>
</body>
</html>