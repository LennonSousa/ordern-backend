import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryOrders1610980061414 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD COLUMN \`payment_type\` VARCHAR(100) NOT NULL AFTER \`payment\`, ADD COLUMN \`notes\` TEXT NULL AFTER \`address\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`payment_type\` , DROP COLUMN \`notes\` ;`);
    }

}
