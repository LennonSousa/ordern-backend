import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryCustomerPayments1608932466784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer_payments\` ADD COLUMN \`brand\` VARCHAR(45) NOT NULL AFTER \`card_number\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer_payments\` DROP COLUMN \`brand\` ;`);
    }

}
