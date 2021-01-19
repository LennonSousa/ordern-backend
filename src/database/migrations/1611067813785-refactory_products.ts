import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryProducts1611067813785 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD COLUMN \`on_request\` TINYINT(1) NOT NULL DEFAULT '0' AFTER \`available_all\`; `);
        await queryRunner.query(`ALTER TABLE \`restaurant_payment_methods\` ADD COLUMN \`description\` VARCHAR(100) NOT NULL AFTER \`id\`, ADD COLUMN \`code\` VARCHAR(100) NOT NULL AFTER \`description\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`notes\` ;`);
        await queryRunner.query(`ALTER TABLE \`restaurant_payment_methods\` DROP COLUMN \`description\` ,  DROP COLUMN \`code\` ;`);
    }

}
