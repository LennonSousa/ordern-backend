import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryRestaurant1611581604109 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurants\` ` +
        `ADD COLUMN \`latitude\` VARCHAR(100) NOT NULL AFTER \`country\`, ` +
        `ADD COLUMN \`longitude\` VARCHAR(100) NOT NULL AFTER \`latitude\`, ` +
        `ADD COLUMN \`free_shipping\` DECIMAL(10,2) NOT NULL DEFAULT '0.00' AFTER \`longitude\` ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurants\` ` +
        `DROP COLUMN \`latitude\` , ` +
        `DROP COLUMN \`longitude\` , ` +
        `DROP COLUMN \`free_shipping\` ;`);
    }

}
