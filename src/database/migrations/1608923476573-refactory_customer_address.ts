import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryCustomerAddress1608923476573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client_address\` RENAME TO  \`customer_address\` ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client_address\` RENAME TO  \`client_address\` ;`);
    }

}
