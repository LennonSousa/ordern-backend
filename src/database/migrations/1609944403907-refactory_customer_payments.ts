import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryCustomerPayments1609944403907 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer_payments\` CHANGE COLUMN \`card_number\` \`card_number\` VARCHAR(500) NOT NULL ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer_payments\` CHANGE COLUMN \`card_number\` \`card_number\` VARCHAR(255) NOT NULL ;`);
    }

}
