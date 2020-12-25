import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryOrders1608935455054 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD COLUMN \`paid\` TINYINT(1) NOT NULL DEFAULT '0' AFTER \`payment\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`paid\` ;`);
    }

}
