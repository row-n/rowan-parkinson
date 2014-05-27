<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'dev_rowanparkinson-wp');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'Qb@D#>.BeQ)e.@IbF#$-CdW4?t~A*SXmiTif}La4J z<}}aKRU*HJv]Rh$|,mG=)');
define('SECURE_AUTH_KEY',  'zJ-io)C|[Y{|-`>q+.P%oJ(M^5`eWcI,y2N@)7}TG:#/T4aF#%I$rhA~0_qjBIMR');
define('LOGGED_IN_KEY',    'ZnN^ohL5><xBR=-uSB|r2/^IP2-&=D>rrOl9>V!?Q:5_CMo2G+FWx-`F|dVUPTG{');
define('NONCE_KEY',        'fcrl?qcRR= tppIcK??d^1k][0ndHD< +^A)5@O =7b2#](FHv&]Tqaa!NJ:#O-i');
define('AUTH_SALT',        'WeNQQ[/-#(r8EgYi]oa;):n<@bUB]LF2*IW/G#>&D^%}|F2&T<H=}[~e!=/jc@.r');
define('SECURE_AUTH_SALT', '$Y9]xmYh{1qgs&rp;,AwFnaW;Lx7s1wNGeV+#Hh1tSp6T?`(RW/d4+F})$]#b*8#');
define('LOGGED_IN_SALT',   'w aRhv xz+T~t**E>&(nzN5i0Fi]tG{$XM!xr2+!jxk9FAy8!h,b|MGBW2t~m|=t');
define('NONCE_SALT',       'o~0@_/}0zJ+d|ZfNz 36ss*LUbG-U}f6Wp5*9rj%Ke!|rUkHRE9nw,>5|F%E:4kk');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
