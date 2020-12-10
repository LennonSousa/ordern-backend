import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoryClientPayments1607612098824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client_payments\` ADD COLUMN \`card_number\` VARCHAR(255) NOT NULL AFTER \`id\`, ADD COLUMN \`valid\` VARCHAR(255) NOT NULL AFTER \`card_number\`, ADD COLUMN \`cvv\` VARCHAR(255) NOT NULL AFTER \`valid\`, ADD COLUMN \`name\` VARCHAR(255) NOT NULL AFTER \`cvv\`, ADD COLUMN \`cpf\` VARCHAR(255) NOT NULL AFTER \`name\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client_payments\` DROP COLUMN \`card_number\`, DROP COLUMN \`valid\` DROP COLUMN \`cvv\` DROP COLUMN \`name\` DROP COLUMN \`cpf\``); // reverts things made in "up" method
    }
}
