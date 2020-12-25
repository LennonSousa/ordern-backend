import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryCustomerPayments1608922978154 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client_payments\` CHANGE COLUMN \`valid\` \`exp_month\` VARCHAR(255) NOT NULL , CHANGE COLUMN \`cvv\` \`exp_year\` VARCHAR(255) NOT NULL , RENAME TO \`customer_payments\` ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client_payments\` CHANGE COLUMN \`valid\` \`valid\` VARCHAR(255) NOT NULL , CHANGE COLUMN \`cvv\` \`cvv\` VARCHAR(255) NOT NULL , RENAME TO \`client_payments\` ;`);
    }

}
