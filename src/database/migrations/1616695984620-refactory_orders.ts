import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoryOrders1616695984620 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ` +
        `ADD COLUMN \`delivery_estimated\` INT NOT NULL AFTER \`delivery_type\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ` +
            `DROP COLUMN \`delivery_estimated\`;`);
    }

}
