import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryOrderItems1610671969668 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP COLUMN \`additional_item\`, DROP COLUMN \`additional\` ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD COLUMN \`additional\` TINYINT(1) NOT NULL , CHANGE COLUMN \`additional_item\` DECIMAL(10,2) NOT NULL ;`);
    }

}