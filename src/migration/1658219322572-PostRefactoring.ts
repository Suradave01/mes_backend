import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1658219322572 implements MigrationInterface {
  name = 'PostRefactoring1658219322572';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tb_permission\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`permission_id\` int NOT NULL AUTO_INCREMENT, \`resource_id\` int NOT NULL, \`permission_name\` varchar(50) NOT NULL, \`permission\` int NOT NULL, PRIMARY KEY (\`permission_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_resource\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`resource_id\` int NOT NULL AUTO_INCREMENT, \`resource_code\` varchar(50) NOT NULL, \`resource_name\` varchar(50) NOT NULL, \`resource_type\` varchar(50) NOT NULL, PRIMARY KEY (\`resource_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_role_mapping_permission\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`role_mapping_permission_id\` int NOT NULL AUTO_INCREMENT, \`description\` text NULL, \`permission_id\` int NOT NULL, \`role_id\` int NOT NULL, PRIMARY KEY (\`role_mapping_permission_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_role\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`role_id\` int NOT NULL AUTO_INCREMENT, \`role_name\` varchar(50) NOT NULL, \`role_description\` text NULL, PRIMARY KEY (\`role_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_user_mapping_group\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_mapping_group_id\` int NOT NULL AUTO_INCREMENT, \`group_id\` int NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`user_mapping_group_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_production\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`production_id\` int NOT NULL AUTO_INCREMENT, \`import_id\` int NOT NULL, \`company_id\` int NOT NULL, \`master_no\` int NOT NULL, \`customer_id\` int NOT NULL, \`description\` text NULL, \`quantity\` int NOT NULL, \`workorder_no\` int NOT NULL, \`workorder_code\` varchar(100) NULL, \`order_date\` date NULL, \`due_date\` date NULL, \`author\` varchar(255) NULL, \`seller\` varchar(255) NULL, \`md5_dataversion\` varchar(255) NOT NULL, PRIMARY KEY (\`production_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_workorder\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`workorder_id\` int NOT NULL AUTO_INCREMENT, \`workorder_no\` varchar(255) NOT NULL, \`production_id\` int NULL, \`wip_flow_id\` int NOT NULL, \`prioritize\` double NOT NULL, \`note\` varchar(255) NULL, \`copy_ref\` int NULL, PRIMARY KEY (\`workorder_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_channel_mapping_wip\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`channel_mapping_wip_id\` int NOT NULL AUTO_INCREMENT, \`wip_id\` int NOT NULL, \`channel_id\` int NOT NULL, PRIMARY KEY (\`channel_mapping_wip_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_wip\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`wip_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`description\` text NULL, \`company_id\` int NULL, \`field_default\` text NULL DEFAULT '{}', PRIMARY KEY (\`wip_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_wip_flow_mapping\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`wip_flow_mapping_id\` int NOT NULL AUTO_INCREMENT, \`wip_flow_id\` int NOT NULL, \`wip_id\` int NOT NULL, \`wip_sequence\` int NOT NULL, PRIMARY KEY (\`wip_flow_mapping_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_workorder_item\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`workorder_item_id\` int NOT NULL AUTO_INCREMENT, \`workorder_id\` int NOT NULL, \`wip_flow_mapping_id\` int NULL, \`remark_by\` varchar(100) NULL, \`remark\` varchar(200) NULL, \`import_id\` int NOT NULL, \`field_name\` varchar(200) NULL, \`field_value\` varchar(200) NULL, \`asset_cancel_count\` int NULL, PRIMARY KEY (\`workorder_item_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_import\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` int NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`import_id\` int NOT NULL AUTO_INCREMENT, \`file_name\` varchar(255) NOT NULL, \`file_type\` varchar(255) NOT NULL, PRIMARY KEY (\`import_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_user\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` int NOT NULL AUTO_INCREMENT, \`is_system\` tinyint NULL, \`username\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_73b9d65d3c93dcf253eaa9b557\` (\`username\`), UNIQUE INDEX \`IDX_ebe445a8233800b2f59004d8dd\` (\`email\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_group\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`group_id\` int NOT NULL AUTO_INCREMENT, \`group_name\` varchar(50) NOT NULL, \`group_description\` text NULL, \`default_role\` int NOT NULL, PRIMARY KEY (\`group_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_menu_mapping_role\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`menu_mapping_role_id\` int NOT NULL AUTO_INCREMENT, \`resource_id\` int NOT NULL, \`role_id\` int NOT NULL, \`description\` text NULL, PRIMARY KEY (\`menu_mapping_role_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_partition_mapping_group\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`partition_mapping_group_id\` int NOT NULL AUTO_INCREMENT, \`group_id\` int NOT NULL, \`partition_id\` int NOT NULL, PRIMARY KEY (\`partition_mapping_group_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_partition\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`partition_id\` int NOT NULL AUTO_INCREMENT, \`partition_name\` varchar(50) NOT NULL, \`partition_description\` text NOT NULL, \`model_name\` varchar(50) NOT NULL, \`sql_append\` varchar(50) NOT NULL, PRIMARY KEY (\`partition_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_user_mapping_partition\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_mapping_partition_id\` int NOT NULL AUTO_INCREMENT, \`partition_id\` int NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`user_mapping_partition_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_user_mapping_role\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_mapping_role_id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`role_id\` int NOT NULL, PRIMARY KEY (\`user_mapping_role_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_user_mapping_company\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`tb_user_mapping_company_id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`company_id\` int NOT NULL, PRIMARY KEY (\`tb_user_mapping_company_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_customer\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` int NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`customer_id\` int NOT NULL AUTO_INCREMENT, \`company_id\` int NULL, \`name\` varchar(100) NOT NULL, \`customer_no\` varchar(100) NOT NULL, \`import_id\` int NULL, \`md5_dataVersion\` varchar(100) NULL, \`raw_data\` text NULL DEFAULT '{}', PRIMARY KEY (\`customer_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_import_data\` (\`import_data_id\` int NOT NULL AUTO_INCREMENT, \`import_id\` int NOT NULL, \`sheet_name\` varchar(255) NULL, \`raw_data\` text NULL DEFAULT '{}', PRIMARY KEY (\`import_data_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_wip_flow\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`wip_flow_id\` int NOT NULL AUTO_INCREMENT, \`production_id\` int NULL, \`ref_wip_flow_id\` int NULL, \`company_id\` int NOT NULL, \`wip_flow_name\` varchar(50) NOT NULL, \`description\` text NULL, \`presentation_template\` text NULL, \`is_template\` tinyint NULL, PRIMARY KEY (\`wip_flow_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_channel_mapping_wip_flow\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`channel_mapping_wip_flow_id\` int NOT NULL AUTO_INCREMENT, \`wip_flow_id\` int NOT NULL, \`channel_id\` int NOT NULL, PRIMARY KEY (\`channel_mapping_wip_flow_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_message_mapping_contact_channel\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`message_mapping_contact_channel_id\` int NOT NULL AUTO_INCREMENT, \`contact_mapping_channel_id\` int NOT NULL, \`message_id\` int NOT NULL, \`raw_message\` text NOT NULL, PRIMARY KEY (\`message_mapping_contact_channel_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_template\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`template_id\` int NOT NULL AUTO_INCREMENT, \`template_name\` varchar(100) NOT NULL, \`description\` text NOT NULL, \`subject_template\` varchar(255) NOT NULL, \`body_template\` varchar(255) NOT NULL, PRIMARY KEY (\`template_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_message\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`message_id\` int NOT NULL AUTO_INCREMENT, \`template_id\` int NOT NULL, \`channel_id\` int NOT NULL, \`contact_id\` int NOT NULL, \`subject\` varchar(255) NOT NULL, \`body\` varchar(255) NOT NULL, \`object_id_trigger\` int NOT NULL, \`object_id_workorder_item\` int NOT NULL, \`object_type_id\` int NOT NULL, \`field_to\` varchar(255) NOT NULL, \`field_event\` varchar(255) NOT NULL, \`field_event_datetime\` varchar(255) NOT NULL, \`field_link\` varchar(255) NOT NULL, PRIMARY KEY (\`message_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_contact\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` int NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`contact_id\` int NOT NULL AUTO_INCREMENT, \`contact_name\` varchar(100) NOT NULL, \`contact_lastname\` varchar(100) NOT NULL, \`company_id\` int NOT NULL, \`address\` text NOT NULL, \`telephone_no\` varchar(255) NOT NULL, \`line_token\` varchar(255) NOT NULL, PRIMARY KEY (\`contact_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_contact_mapping_channel\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`contact_mapping_channel_id\` int NOT NULL AUTO_INCREMENT, \`contact_id\` int NOT NULL, \`value\` varchar(100) NOT NULL, \`channel_id\` int NOT NULL, \`_primary\` tinyint NOT NULL, PRIMARY KEY (\`contact_mapping_channel_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_company\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` int NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`company_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`fullname\` varchar(100) NOT NULL, \`address\` varchar(255) NOT NULL, \`telephone_no\` varchar(255) NOT NULL, PRIMARY KEY (\`company_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_asset\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` int NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`asset_id\` int NOT NULL AUTO_INCREMENT, \`asset_name\` varchar(100) NOT NULL, \`description\` text NULL, \`company_id\` int NULL, \`wip_id\` int NULL, PRIMARY KEY (\`asset_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_asset_mapping_device\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`asset_mapping_device_id\` int NOT NULL AUTO_INCREMENT, \`asset_id\` int NOT NULL, \`device_id\` int NOT NULL, \`device_order\` int NULL, PRIMARY KEY (\`asset_mapping_device_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_condition_type\` (\`condition_type_id\` int NOT NULL AUTO_INCREMENT, \`condition_type_name\` varchar(50) NOT NULL, \`description\` text NULL, \`field_compare\` varchar(255) NOT NULL, \`condition\` varchar(255) NOT NULL, PRIMARY KEY (\`condition_type_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_device_field\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`device_field_id\` int NOT NULL AUTO_INCREMENT, \`device_id\` int NOT NULL, \`field_name\` varchar(255) NOT NULL, \`field_type\` varchar(255) NOT NULL, \`field_order\` varchar(255) NULL, \`string_value\` varchar(255) NULL, \`number_value\` double NULL, \`description\` text NULL, \`last_update\` datetime NULL, PRIMARY KEY (\`device_field_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_device\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` int NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`device_id\` int NOT NULL AUTO_INCREMENT, \`company_id\` int NULL, \`device_name\` varchar(100) NOT NULL, \`description\` text NULL, PRIMARY KEY (\`device_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_trigger\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` varchar(255) NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`trigger_id\` int NOT NULL AUTO_INCREMENT, \`trigger_name\` varchar(100) NOT NULL, \`asset_id\` int NULL, \`channel_id\` int NULL, \`value\` int NULL, \`condition_type_id\` int NULL, \`device_field_id\` int NULL, \`type\` varchar(50) NULL, PRIMARY KEY (\`trigger_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tb_channel\` (\`state\` varchar(32) NOT NULL DEFAULT 'start', \`create_by\` int NULL, \`update_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`channel_id\` int NOT NULL AUTO_INCREMENT, \`channel_name\` varchar(100) NOT NULL, \`description\` text NOT NULL, \`type\` varchar(100) NOT NULL, \`template_id\` int NULL, PRIMARY KEY (\`channel_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_permission\` ADD CONSTRAINT \`FK_ebbc1dcef77d2dc19a3244ac295\` FOREIGN KEY (\`resource_id\`) REFERENCES \`tb_resource\`(\`resource_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_role_mapping_permission\` ADD CONSTRAINT \`FK_c4cd6e9412377cac9262ad426b5\` FOREIGN KEY (\`role_id\`) REFERENCES \`tb_role\`(\`role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_role_mapping_permission\` ADD CONSTRAINT \`FK_abbf78dbd737a60eb1837856cda\` FOREIGN KEY (\`permission_id\`) REFERENCES \`tb_permission\`(\`permission_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_group\` ADD CONSTRAINT \`FK_5ded5e15c32d03846099e50d606\` FOREIGN KEY (\`user_id\`) REFERENCES \`tb_user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_group\` ADD CONSTRAINT \`FK_aad51c71d57483a20f34be9ad00\` FOREIGN KEY (\`group_id\`) REFERENCES \`tb_group\`(\`group_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_production\` ADD CONSTRAINT \`FK_8818bb23fd8d190a4a750fbf8ce\` FOREIGN KEY (\`company_id\`) REFERENCES \`tb_company\`(\`company_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_production\` ADD CONSTRAINT \`FK_2cb401d18af585182f9a14fa32b\` FOREIGN KEY (\`import_id\`) REFERENCES \`tb_import\`(\`import_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_production\` ADD CONSTRAINT \`FK_0652b1731234e668e31d5ef15e0\` FOREIGN KEY (\`customer_id\`) REFERENCES \`tb_customer\`(\`customer_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_workorder\` ADD CONSTRAINT \`FK_5d18e152da16ae283cbf501cd72\` FOREIGN KEY (\`production_id\`) REFERENCES \`tb_production\`(\`production_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_workorder\` ADD CONSTRAINT \`FK_adc7117cb7040269c6b647ffa6e\` FOREIGN KEY (\`wip_flow_id\`) REFERENCES \`tb_wip_flow\`(\`wip_flow_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_channel_mapping_wip\` ADD CONSTRAINT \`FK_dfa029b488555abebf3a5144a59\` FOREIGN KEY (\`channel_id\`) REFERENCES \`tb_channel\`(\`channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_channel_mapping_wip\` ADD CONSTRAINT \`FK_5e56234ae8e144b7fcbf5772fa2\` FOREIGN KEY (\`wip_id\`) REFERENCES \`tb_wip\`(\`wip_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_wip\` ADD CONSTRAINT \`FK_6268ce00d7f64c261c98092f88a\` FOREIGN KEY (\`company_id\`) REFERENCES \`tb_company\`(\`company_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_wip_flow_mapping\` ADD CONSTRAINT \`FK_c72b3d4f7d4417228c55bb95a62\` FOREIGN KEY (\`wip_flow_id\`) REFERENCES \`tb_wip_flow\`(\`wip_flow_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_wip_flow_mapping\` ADD CONSTRAINT \`FK_a35adcb714d19a42626e2ff1dcf\` FOREIGN KEY (\`wip_id\`) REFERENCES \`tb_wip\`(\`wip_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_workorder_item\` ADD CONSTRAINT \`FK_e79195893af3997aae822b66ff7\` FOREIGN KEY (\`import_id\`) REFERENCES \`tb_import\`(\`import_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_workorder_item\` ADD CONSTRAINT \`FK_992202b1962cdbe99996518014d\` FOREIGN KEY (\`workorder_id\`) REFERENCES \`tb_workorder\`(\`workorder_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_workorder_item\` ADD CONSTRAINT \`FK_370f7d535e006221c6cc32f0c51\` FOREIGN KEY (\`wip_flow_mapping_id\`) REFERENCES \`tb_wip_flow_mapping\`(\`wip_flow_mapping_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_import\` ADD CONSTRAINT \`FK_a0f257523f5cec2fdd93a46775e\` FOREIGN KEY (\`create_by\`) REFERENCES \`tb_user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_menu_mapping_role\` ADD CONSTRAINT \`FK_42ad6d671bd777922456f922191\` FOREIGN KEY (\`role_id\`) REFERENCES \`tb_role\`(\`role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_menu_mapping_role\` ADD CONSTRAINT \`FK_15dfb9bde616e602de9e79e4ea3\` FOREIGN KEY (\`resource_id\`) REFERENCES \`tb_resource\`(\`resource_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_partition_mapping_group\` ADD CONSTRAINT \`FK_a2ecf217777936101b6ac81c930\` FOREIGN KEY (\`partition_id\`) REFERENCES \`tb_partition\`(\`partition_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_partition_mapping_group\` ADD CONSTRAINT \`FK_b3a198336498ec7846c7ae28667\` FOREIGN KEY (\`group_id\`) REFERENCES \`tb_group\`(\`group_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_partition\` ADD CONSTRAINT \`FK_33796130cc442826c12e877b118\` FOREIGN KEY (\`user_id\`) REFERENCES \`tb_user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_partition\` ADD CONSTRAINT \`FK_6ca42e90ad37214bf803902f145\` FOREIGN KEY (\`partition_id\`) REFERENCES \`tb_partition\`(\`partition_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_role\` ADD CONSTRAINT \`FK_5782013574286e508ef284b23ba\` FOREIGN KEY (\`user_id\`) REFERENCES \`tb_user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_role\` ADD CONSTRAINT \`FK_0f83bcac58b1519e8d2b1f73056\` FOREIGN KEY (\`role_id\`) REFERENCES \`tb_role\`(\`role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_company\` ADD CONSTRAINT \`FK_f518ad43eb6335b7dce19254936\` FOREIGN KEY (\`user_id\`) REFERENCES \`tb_user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_company\` ADD CONSTRAINT \`FK_2e86bce0e41f6dcfaadf7f9f38a\` FOREIGN KEY (\`company_id\`) REFERENCES \`tb_company\`(\`company_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_customer\` ADD CONSTRAINT \`FK_adb749d73caaa584afe3ad6b3ae\` FOREIGN KEY (\`company_id\`) REFERENCES \`tb_company\`(\`company_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_customer\` ADD CONSTRAINT \`FK_1223fd32e266a00928a78be5236\` FOREIGN KEY (\`create_by\`) REFERENCES \`tb_user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_customer\` ADD CONSTRAINT \`FK_38c25a3c0d775637f3e692ba651\` FOREIGN KEY (\`import_id\`) REFERENCES \`tb_import\`(\`import_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_import_data\` ADD CONSTRAINT \`FK_5e2549df60f3c43d8145a4108a7\` FOREIGN KEY (\`import_id\`) REFERENCES \`tb_import\`(\`import_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_wip_flow\` ADD CONSTRAINT \`FK_7be12e09d2edc6fb59d5bf88dbf\` FOREIGN KEY (\`company_id\`) REFERENCES \`tb_company\`(\`company_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_wip_flow\` ADD CONSTRAINT \`FK_df4311fc84c7561c8f61a42f392\` FOREIGN KEY (\`production_id\`) REFERENCES \`tb_production\`(\`production_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_channel_mapping_wip_flow\` ADD CONSTRAINT \`FK_9aa340348b7fd9f9bdaff827f6b\` FOREIGN KEY (\`channel_id\`) REFERENCES \`tb_channel\`(\`channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_channel_mapping_wip_flow\` ADD CONSTRAINT \`FK_8c01d696ff5a2cf16f67338a838\` FOREIGN KEY (\`wip_flow_id\`) REFERENCES \`tb_wip_flow\`(\`wip_flow_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_message_mapping_contact_channel\` ADD CONSTRAINT \`FK_70af875270278cdfdb8ea6c3e57\` FOREIGN KEY (\`message_id\`) REFERENCES \`tb_message\`(\`message_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_message_mapping_contact_channel\` ADD CONSTRAINT \`FK_a0fa7e64c44e79f044b1f46b9f8\` FOREIGN KEY (\`contact_mapping_channel_id\`) REFERENCES \`tb_contact_mapping_channel\`(\`contact_mapping_channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_message\` ADD CONSTRAINT \`FK_d6fc06064ddb707d84c209d4787\` FOREIGN KEY (\`channel_id\`) REFERENCES \`tb_channel\`(\`channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_message\` ADD CONSTRAINT \`FK_bf9ab63b82690222f891388fbf2\` FOREIGN KEY (\`template_id\`) REFERENCES \`tb_template\`(\`template_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_message\` ADD CONSTRAINT \`FK_76cc3285957a6fa685e11de6efc\` FOREIGN KEY (\`contact_id\`) REFERENCES \`tb_contact\`(\`contact_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_message\` ADD CONSTRAINT \`FK_fc0c86e32cf21b8a72505497a3c\` FOREIGN KEY (\`object_id_trigger\`) REFERENCES \`tb_trigger\`(\`trigger_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_message\` ADD CONSTRAINT \`FK_4b250542c36e162bc3955a620e4\` FOREIGN KEY (\`object_id_workorder_item\`) REFERENCES \`tb_workorder_item\`(\`workorder_item_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_contact\` ADD CONSTRAINT \`FK_138d9791588d9c523d94939a1a6\` FOREIGN KEY (\`company_id\`) REFERENCES \`tb_company\`(\`company_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_contact\` ADD CONSTRAINT \`FK_c20763710a22848dd44aaacc849\` FOREIGN KEY (\`create_by\`) REFERENCES \`tb_user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_contact_mapping_channel\` ADD CONSTRAINT \`FK_2c0b2ffcc73e3b2856c2eb7200d\` FOREIGN KEY (\`contact_id\`) REFERENCES \`tb_contact\`(\`contact_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_contact_mapping_channel\` ADD CONSTRAINT \`FK_df920e8782e79a7703b914298c1\` FOREIGN KEY (\`channel_id\`) REFERENCES \`tb_channel\`(\`channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_company\` ADD CONSTRAINT \`FK_be01e6236b5a06b70754573d9cc\` FOREIGN KEY (\`create_by\`) REFERENCES \`tb_user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_asset\` ADD CONSTRAINT \`FK_f504b1d92c627d006c8472333cb\` FOREIGN KEY (\`company_id\`) REFERENCES \`tb_company\`(\`company_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_asset\` ADD CONSTRAINT \`FK_470de9bfb1534af84b02035471e\` FOREIGN KEY (\`create_by\`) REFERENCES \`tb_user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_asset\` ADD CONSTRAINT \`FK_e7972c684d25dadcde1c919f91a\` FOREIGN KEY (\`wip_id\`) REFERENCES \`tb_wip\`(\`wip_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_asset_mapping_device\` ADD CONSTRAINT \`FK_bf76f2a7b591b2613147ca86cf0\` FOREIGN KEY (\`asset_id\`) REFERENCES \`tb_asset\`(\`asset_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_asset_mapping_device\` ADD CONSTRAINT \`FK_ec233edb0c9df614ad4edd809aa\` FOREIGN KEY (\`device_id\`) REFERENCES \`tb_device\`(\`device_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_device_field\` ADD CONSTRAINT \`FK_f2f711c6182dd64a33aca2963f6\` FOREIGN KEY (\`device_id\`) REFERENCES \`tb_device\`(\`device_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_device\` ADD CONSTRAINT \`FK_cb69ce6b4382d8d60d76b08a824\` FOREIGN KEY (\`company_id\`) REFERENCES \`tb_company\`(\`company_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_device\` ADD CONSTRAINT \`FK_a053726a7cb9b77d81910cc9213\` FOREIGN KEY (\`create_by\`) REFERENCES \`tb_user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_trigger\` ADD CONSTRAINT \`FK_67bb34aa5198bad3d3111e334d4\` FOREIGN KEY (\`asset_id\`) REFERENCES \`tb_asset\`(\`asset_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_trigger\` ADD CONSTRAINT \`FK_3dcc5e5946de693a9445dc01fcc\` FOREIGN KEY (\`device_field_id\`) REFERENCES \`tb_device_field\`(\`device_field_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_trigger\` ADD CONSTRAINT \`FK_9987d393060726c7594e6daa005\` FOREIGN KEY (\`condition_type_id\`) REFERENCES \`tb_condition_type\`(\`condition_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_trigger\` ADD CONSTRAINT \`FK_54f25f41b6189a829dbfb11433c\` FOREIGN KEY (\`channel_id\`) REFERENCES \`tb_channel\`(\`channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_channel\` ADD CONSTRAINT \`FK_75a54563f996e64b797a419550f\` FOREIGN KEY (\`create_by\`) REFERENCES \`tb_user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_channel\` ADD CONSTRAINT \`FK_71af92ba00665ce52dc3954ac57\` FOREIGN KEY (\`template_id\`) REFERENCES \`tb_template\`(\`template_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tb_channel\` DROP FOREIGN KEY \`FK_71af92ba00665ce52dc3954ac57\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_channel\` DROP FOREIGN KEY \`FK_75a54563f996e64b797a419550f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_trigger\` DROP FOREIGN KEY \`FK_54f25f41b6189a829dbfb11433c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_trigger\` DROP FOREIGN KEY \`FK_9987d393060726c7594e6daa005\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_trigger\` DROP FOREIGN KEY \`FK_3dcc5e5946de693a9445dc01fcc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_trigger\` DROP FOREIGN KEY \`FK_67bb34aa5198bad3d3111e334d4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_device\` DROP FOREIGN KEY \`FK_a053726a7cb9b77d81910cc9213\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_device\` DROP FOREIGN KEY \`FK_cb69ce6b4382d8d60d76b08a824\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_device_field\` DROP FOREIGN KEY \`FK_f2f711c6182dd64a33aca2963f6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_asset_mapping_device\` DROP FOREIGN KEY \`FK_ec233edb0c9df614ad4edd809aa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_asset_mapping_device\` DROP FOREIGN KEY \`FK_bf76f2a7b591b2613147ca86cf0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_asset\` DROP FOREIGN KEY \`FK_e7972c684d25dadcde1c919f91a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_asset\` DROP FOREIGN KEY \`FK_470de9bfb1534af84b02035471e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_asset\` DROP FOREIGN KEY \`FK_f504b1d92c627d006c8472333cb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_company\` DROP FOREIGN KEY \`FK_be01e6236b5a06b70754573d9cc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_contact_mapping_channel\` DROP FOREIGN KEY \`FK_df920e8782e79a7703b914298c1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_contact_mapping_channel\` DROP FOREIGN KEY \`FK_2c0b2ffcc73e3b2856c2eb7200d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_contact\` DROP FOREIGN KEY \`FK_c20763710a22848dd44aaacc849\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_contact\` DROP FOREIGN KEY \`FK_138d9791588d9c523d94939a1a6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_message\` DROP FOREIGN KEY \`FK_4b250542c36e162bc3955a620e4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_message\` DROP FOREIGN KEY \`FK_fc0c86e32cf21b8a72505497a3c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_message\` DROP FOREIGN KEY \`FK_76cc3285957a6fa685e11de6efc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_message\` DROP FOREIGN KEY \`FK_bf9ab63b82690222f891388fbf2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_message\` DROP FOREIGN KEY \`FK_d6fc06064ddb707d84c209d4787\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_message_mapping_contact_channel\` DROP FOREIGN KEY \`FK_a0fa7e64c44e79f044b1f46b9f8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_message_mapping_contact_channel\` DROP FOREIGN KEY \`FK_70af875270278cdfdb8ea6c3e57\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_channel_mapping_wip_flow\` DROP FOREIGN KEY \`FK_8c01d696ff5a2cf16f67338a838\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_channel_mapping_wip_flow\` DROP FOREIGN KEY \`FK_9aa340348b7fd9f9bdaff827f6b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_wip_flow\` DROP FOREIGN KEY \`FK_df4311fc84c7561c8f61a42f392\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_wip_flow\` DROP FOREIGN KEY \`FK_7be12e09d2edc6fb59d5bf88dbf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_import_data\` DROP FOREIGN KEY \`FK_5e2549df60f3c43d8145a4108a7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_customer\` DROP FOREIGN KEY \`FK_38c25a3c0d775637f3e692ba651\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_customer\` DROP FOREIGN KEY \`FK_1223fd32e266a00928a78be5236\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_customer\` DROP FOREIGN KEY \`FK_adb749d73caaa584afe3ad6b3ae\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_company\` DROP FOREIGN KEY \`FK_2e86bce0e41f6dcfaadf7f9f38a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_company\` DROP FOREIGN KEY \`FK_f518ad43eb6335b7dce19254936\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_role\` DROP FOREIGN KEY \`FK_0f83bcac58b1519e8d2b1f73056\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_role\` DROP FOREIGN KEY \`FK_5782013574286e508ef284b23ba\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_partition\` DROP FOREIGN KEY \`FK_6ca42e90ad37214bf803902f145\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_partition\` DROP FOREIGN KEY \`FK_33796130cc442826c12e877b118\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_partition_mapping_group\` DROP FOREIGN KEY \`FK_b3a198336498ec7846c7ae28667\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_partition_mapping_group\` DROP FOREIGN KEY \`FK_a2ecf217777936101b6ac81c930\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_menu_mapping_role\` DROP FOREIGN KEY \`FK_15dfb9bde616e602de9e79e4ea3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_menu_mapping_role\` DROP FOREIGN KEY \`FK_42ad6d671bd777922456f922191\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_import\` DROP FOREIGN KEY \`FK_a0f257523f5cec2fdd93a46775e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_workorder_item\` DROP FOREIGN KEY \`FK_370f7d535e006221c6cc32f0c51\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_workorder_item\` DROP FOREIGN KEY \`FK_992202b1962cdbe99996518014d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_workorder_item\` DROP FOREIGN KEY \`FK_e79195893af3997aae822b66ff7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_wip_flow_mapping\` DROP FOREIGN KEY \`FK_a35adcb714d19a42626e2ff1dcf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_wip_flow_mapping\` DROP FOREIGN KEY \`FK_c72b3d4f7d4417228c55bb95a62\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_wip\` DROP FOREIGN KEY \`FK_6268ce00d7f64c261c98092f88a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_channel_mapping_wip\` DROP FOREIGN KEY \`FK_5e56234ae8e144b7fcbf5772fa2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_channel_mapping_wip\` DROP FOREIGN KEY \`FK_dfa029b488555abebf3a5144a59\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_workorder\` DROP FOREIGN KEY \`FK_adc7117cb7040269c6b647ffa6e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_workorder\` DROP FOREIGN KEY \`FK_5d18e152da16ae283cbf501cd72\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_production\` DROP FOREIGN KEY \`FK_0652b1731234e668e31d5ef15e0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_production\` DROP FOREIGN KEY \`FK_2cb401d18af585182f9a14fa32b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_production\` DROP FOREIGN KEY \`FK_8818bb23fd8d190a4a750fbf8ce\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_group\` DROP FOREIGN KEY \`FK_aad51c71d57483a20f34be9ad00\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user_mapping_group\` DROP FOREIGN KEY \`FK_5ded5e15c32d03846099e50d606\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_role_mapping_permission\` DROP FOREIGN KEY \`FK_abbf78dbd737a60eb1837856cda\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_role_mapping_permission\` DROP FOREIGN KEY \`FK_c4cd6e9412377cac9262ad426b5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_permission\` DROP FOREIGN KEY \`FK_ebbc1dcef77d2dc19a3244ac295\``,
    );
    await queryRunner.query(`DROP TABLE \`tb_channel\``);
    await queryRunner.query(`DROP TABLE \`tb_trigger\``);
    await queryRunner.query(`DROP TABLE \`tb_device\``);
    await queryRunner.query(`DROP TABLE \`tb_device_field\``);
    await queryRunner.query(`DROP TABLE \`tb_condition_type\``);
    await queryRunner.query(`DROP TABLE \`tb_asset_mapping_device\``);
    await queryRunner.query(`DROP TABLE \`tb_asset\``);
    await queryRunner.query(`DROP TABLE \`tb_company\``);
    await queryRunner.query(`DROP TABLE \`tb_contact_mapping_channel\``);
    await queryRunner.query(`DROP TABLE \`tb_contact\``);
    await queryRunner.query(`DROP TABLE \`tb_message\``);
    await queryRunner.query(`DROP TABLE \`tb_template\``);
    await queryRunner.query(
      `DROP TABLE \`tb_message_mapping_contact_channel\``,
    );
    await queryRunner.query(`DROP TABLE \`tb_channel_mapping_wip_flow\``);
    await queryRunner.query(`DROP TABLE \`tb_wip_flow\``);
    await queryRunner.query(`DROP TABLE \`tb_import_data\``);
    await queryRunner.query(`DROP TABLE \`tb_customer\``);
    await queryRunner.query(`DROP TABLE \`tb_user_mapping_company\``);
    await queryRunner.query(`DROP TABLE \`tb_user_mapping_role\``);
    await queryRunner.query(`DROP TABLE \`tb_user_mapping_partition\``);
    await queryRunner.query(`DROP TABLE \`tb_partition\``);
    await queryRunner.query(`DROP TABLE \`tb_partition_mapping_group\``);
    await queryRunner.query(`DROP TABLE \`tb_menu_mapping_role\``);
    await queryRunner.query(`DROP TABLE \`tb_group\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_ebe445a8233800b2f59004d8dd\` ON \`tb_user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_73b9d65d3c93dcf253eaa9b557\` ON \`tb_user\``,
    );
    await queryRunner.query(`DROP TABLE \`tb_user\``);
    await queryRunner.query(`DROP TABLE \`tb_import\``);
    await queryRunner.query(`DROP TABLE \`tb_workorder_item\``);
    await queryRunner.query(`DROP TABLE \`tb_wip_flow_mapping\``);
    await queryRunner.query(`DROP TABLE \`tb_wip\``);
    await queryRunner.query(`DROP TABLE \`tb_channel_mapping_wip\``);
    await queryRunner.query(`DROP TABLE \`tb_workorder\``);
    await queryRunner.query(`DROP TABLE \`tb_production\``);
    await queryRunner.query(`DROP TABLE \`tb_user_mapping_group\``);
    await queryRunner.query(`DROP TABLE \`tb_role\``);
    await queryRunner.query(`DROP TABLE \`tb_role_mapping_permission\``);
    await queryRunner.query(`DROP TABLE \`tb_resource\``);
    await queryRunner.query(`DROP TABLE \`tb_permission\``);
  }
}
