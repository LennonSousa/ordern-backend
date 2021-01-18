import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryOrderItems1610981147990 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`notes\`, CHANGE COLUMN \`delivery_type\` \`delivery_type\` TEXT NULL DEFAULT NULL ;`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD COLUMN \`notes\` TEXT NULL AFTER \`value\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD COLUMN \`notes\` TEXT NULL AFTER \`address\`, CHANGE COLUMN \`delivery_type\` \`delivery_type\` MEDIUMTEXT NULL DEFAULT NULL ;`);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP COLUMN \`notes\` ;`);
    }

}
