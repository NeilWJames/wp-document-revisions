<?php
/**
 * Verifies basic CRUD operations of WP Document Revisions
 *
 * Loads of operations done in wpSetUpBeforeClass and wpTearDownAfterClass dont appear in Codecov
 * So nothing new here, just do what is in those functions.
 *
 * @author Neil James <neil@familyjames.com> extended from Benjamin J. Balter <ben@balter.com>
 * @package WP Document Revisions
 */

/**
 * Main WP Document Revisions tests
 */
class Test_WP_Document_Revisions_Other extends Test_Common_WPDR {

	/**
	 * List of users being tested.
	 *
	 * @var WP_User[]
	 */
	protected static $users = array(
		'editor' => null,
		'author' => null,
	);

	/**
	 * Author Public Post ID
	 *
	 * @var integer
	 */
	private static $editor_public_post;

	/**
	 * Editor Private Post ID
	 *
	 * @var integer
	 */
	private static $editor_private_post;

	/**
	 * Set up common data.
	 *
	 * @return void
	 */
	public function test_package() {
		// init user roles.
		global $wpdr;
		if ( ! $wpdr ) {
			$wpdr = new WP_Document_Revisions();
		}
		$wpdr->register_cpt();
		$wpdr->add_caps();

		// create users and assign role.
		// Note that editor can do everything admin can do.
		self::$users = array(
			'editor' => self::factory()->user->create_and_get(
				array(
					'user_nicename' => 'Editor',
					'role'          => 'editor',
				)
			),
			'author' => self::factory()->user->create_and_get(
				array(
					'user_nicename' => 'Author',
					'role'          => 'author',
				)
			),
		);

		// flush cache for good measure.
		wp_cache_flush();

		// create posts for scenarios.
		// Editor Public.
		self::$editor_public_post = self::factory()->post->create(
			array(
				'post_title'   => 'Editor Public - ' . time(),
				'post_status'  => 'publish',
				'post_author'  => self::$users['editor']->ID,
				'post_content' => '',
				'post_excerpt' => 'Test Upload',
				'post_type'    => 'document',
			)
		);

		self::assertFalse( is_wp_error( self::factory(), self::$editor_public_post ), 'Failed inserting document Editor Public' );

		// add attachment.
		self::add_document_attachment( self::factory(), self::$editor_public_post, self::$test_file );

		// add second attachment.
		self::add_document_attachment( self::factory(), self::$editor_public_post, self::$test_file2 );

		// Editor Private.
		self::$editor_private_post = self::factory()->post->create(
			array(
				'post_title'   => 'Editor Private - ' . time(),
				'post_status'  => 'private',
				'post_author'  => self::$users['editor']->ID,
				'post_content' => '',
				'post_excerpt' => 'Test Upload',
				'post_type'    => 'document',
			)
		);

		self::assertFalse( is_wp_error( self::$editor_private_post ), 'Failed inserting document Editor Private' );

		// add attachment.
		self::add_document_attachment( self::factory(), self::$editor_private_post, self::$test_file );

		// verify structure.
		self::verify_structure( self::$editor_public_post, 2, 2 );
		self::verify_structure( self::$editor_private_post, 1, 1 );

		// make sure that we have the admin set up.
		if ( ! class_exists( 'WP_Document_Revisions_Admin' ) ) {
			$wpdr->admin_init();
		}

		// add the attachment delete process.
		add_action( 'delete_post', array( $wpdr->admin, 'delete_attachments_with_document' ), 10, 1 );

		wp_delete_post( self::$editor_public_post, true );
		wp_delete_post( self::$editor_private_post, true );

		// delete successful, remove the attachment delete process.
		remove_action( 'delete_post', array( $wpdr->admin, 'delete_attachments_with_document' ), 10, 1 );
	}

	/**
	 * Test EF support.
	 *
	 * @return void
	 */
	public function test_ef_support() {
		// ensure EF present.
		include __DIR__ . '/class-ef-custom-status.php';
		global $edit_flow;
		$edit_flow                = new stdClass();
		$edit_flow->custom_status = new EF_Custom_Status();

		// init user roles.
		global $wpdr;
		if ( ! $wpdr ) {
			$wpdr = new WP_Document_Revisions();
		}
		$wpdr->register_cpt();
		$wpdr->add_caps();

		// call EF support.
		$wpdr->edit_flow_support();

		// create users and assign role.
		// Note that editor can do everything admin can do.
		self::$users = array(
			'editor' => self::factory()->user->create_and_get(
				array(
					'user_nicename' => 'Editor',
					'role'          => 'editor',
				)
			),
			'author' => self::factory()->user->create_and_get(
				array(
					'user_nicename' => 'Author',
					'role'          => 'author',
				)
			),
		);

		// flush cache for good measure.
		wp_cache_flush();

		// create posts for scenarios.
		// Editor Public.
		self::$editor_public_post = self::factory()->post->create(
			array(
				'post_title'   => 'Editor Public - ' . time(),
				'post_status'  => 'publish',
				'post_author'  => self::$users['editor']->ID,
				'post_content' => '',
				'post_excerpt' => 'Test Upload',
				'post_type'    => 'document',
			)
		);

		self::assertFalse( is_wp_error( self::factory(), self::$editor_public_post ), 'Failed inserting document Editor Public' );

		// add attachment.
		self::add_document_attachment( self::factory(), self::$editor_public_post, self::$test_file );

		// add second attachment.
		self::add_document_attachment( self::factory(), self::$editor_public_post, self::$test_file2 );

		// Editor Private.
		self::$editor_private_post = self::factory()->post->create(
			array(
				'post_title'   => 'Editor Private - ' . time(),
				'post_status'  => 'private',
				'post_author'  => self::$users['editor']->ID,
				'post_content' => '',
				'post_excerpt' => 'Test Upload',
				'post_type'    => 'document',
			)
		);

		self::assertFalse( is_wp_error( self::$editor_private_post ), 'Failed inserting document Editor Private' );

		// add attachment.
		self::add_document_attachment( self::factory(), self::$editor_private_post, self::$test_file );

		// verify structure.
		self::verify_structure( self::$editor_public_post, 2, 2 );
		self::verify_structure( self::$editor_private_post, 1, 1 );

		// test status component.
		ob_start();
		$wpdr->post_status_column_cb( 'empty', self::$editor_private_post );
		$wpdr->post_status_column_cb( 'status', self::$editor_private_post );
		$output = ob_get_clean();
		self::assertSame( 'Private', $output, 'status private' );

		// make sure that we have the admin set up.
		if ( ! class_exists( 'WP_Document_Revisions_Admin' ) ) {
			$wpdr->admin_init();
		}

		// add the attachment delete process.
		add_action( 'delete_post', array( $wpdr->admin, 'delete_attachments_with_document' ), 10, 1 );

		wp_delete_post( self::$editor_public_post, true );
		wp_delete_post( self::$editor_private_post, true );

		// delete successful, remove the attachment delete process.
		remove_action( 'delete_post', array( $wpdr->admin, 'delete_attachments_with_document' ), 10, 1 );

		// Exercise other paths.
		$edit_flow->custom_status->module->options->post_types['document'] = 'off';
		$wpdr->edit_flow_support();
		self::assertTrue( true, 'document off' );

		unset( $edit_flow->custom_status->module->options->post_types['document'] );
		$wpdr->edit_flow_support();
		self::assertTrue( true, 'document unset' );
	}

	/**
	 * Test PublishPress_Statuses support.
	 *
	 * @return void
	 */
	public function test_ps_support() {
		// ensure EF present.
		include __DIR__ . '/class-publishpress-statuses.php';
		new PublishPress_Statuses();

		// init user roles.
		global $wpdr;
		if ( ! $wpdr ) {
			$wpdr = new WP_Document_Revisions();
		}
		$wpdr->register_cpt();
		$wpdr->add_caps();

		// call EF support.
		$wpdr->publishpress_statuses_support();

		// create users and assign role.
		// Note that editor can do everything admin can do.
		self::$users = array(
			'editor' => self::factory()->user->create_and_get(
				array(
					'user_nicename' => 'Editor',
					'role'          => 'editor',
				)
			),
			'author' => self::factory()->user->create_and_get(
				array(
					'user_nicename' => 'Author',
					'role'          => 'author',
				)
			),
		);

		// flush cache for good measure.
		wp_cache_flush();

		// create posts for scenarios.
		// Editor Public.
		self::$editor_public_post = self::factory()->post->create(
			array(
				'post_title'   => 'Editor Public - ' . time(),
				'post_status'  => 'publish',
				'post_author'  => self::$users['editor']->ID,
				'post_content' => '',
				'post_excerpt' => 'Test Upload',
				'post_type'    => 'document',
			)
		);

		self::assertFalse( is_wp_error( self::factory(), self::$editor_public_post ), 'Failed inserting document Editor Public' );

		// add attachment.
		self::add_document_attachment( self::factory(), self::$editor_public_post, self::$test_file );

		// add second attachment.
		self::add_document_attachment( self::factory(), self::$editor_public_post, self::$test_file2 );

		// Editor Private.
		self::$editor_private_post = self::factory()->post->create(
			array(
				'post_title'   => 'Editor Private - ' . time(),
				'post_status'  => 'private',
				'post_author'  => self::$users['editor']->ID,
				'post_content' => '',
				'post_excerpt' => 'Test Upload',
				'post_type'    => 'document',
			)
		);

		self::assertFalse( is_wp_error( self::$editor_private_post ), 'Failed inserting document Editor Private' );

		// add attachment.
		self::add_document_attachment( self::factory(), self::$editor_private_post, self::$test_file );

		// verify structure.
		self::verify_structure( self::$editor_public_post, 2, 2 );
		self::verify_structure( self::$editor_private_post, 1, 1 );

		// test status component.
		ob_start();
		$wpdr->post_status_column_cb( 'empty', self::$editor_private_post );
		$wpdr->post_status_column_cb( 'status', self::$editor_private_post );
		$output = ob_get_clean();
		self::assertSame( 'Private', $output, 'status private' );

		// make sure that we have the admin set up.
		if ( ! class_exists( 'WP_Document_Revisions_Admin' ) ) {
			$wpdr->admin_init();
		}

		// add the attachment delete process.
		add_action( 'delete_post', array( $wpdr->admin, 'delete_attachments_with_document' ), 10, 1 );

		wp_delete_post( self::$editor_public_post, true );
		wp_delete_post( self::$editor_private_post, true );

		// delete successful, remove the attachment delete process.
		remove_action( 'delete_post', array( $wpdr->admin, 'delete_attachments_with_document' ), 10, 1 );

		// Exercise other paths.
		PublishPress_Statuses::instance()->options->enabled = 'off';
		$wpdr->publishpress_statuses_support();
		self::assertTrue( true, 'enabled off' );

		unset( PublishPress_Statuses::instance()->options->post_types['document'] );
		$wpdr->publishpress_statuses_support();
		self::assertTrue( true, 'document unset' );
	}
}
