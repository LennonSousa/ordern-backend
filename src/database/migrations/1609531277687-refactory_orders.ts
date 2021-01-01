import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryOrders1609531277687 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD COLUMN \`tracker\` VARCHAR(255) NOT NULL AFTER \`id\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`tracker\`;`);
    }

}
