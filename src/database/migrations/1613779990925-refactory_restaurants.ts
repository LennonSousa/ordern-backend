import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoryRestaurants1613779990925 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurants\` ` +
            `ADD COLUMN \`highlights\` TINYINT(1) NOT NULL DEFAULT '0' AFTER \`free_shipping\`, ` +
            `ADD COLUMN \`highlights_title\` VARCHAR(100) NOT NULL DEFAULT '' AFTER \`highlights\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurants\` ` +
            `DROP COLUMN \`highlights\`, ` +
            `DROP COLUMN \`highlights_title\`;`);
    }

}
