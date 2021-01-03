import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryOrders1609635410220 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD COLUMN \`delivery_type\` MEDIUMTEXT NULL AFTER \`delivery_tax\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`delivery_type\`;`);
    }

}
