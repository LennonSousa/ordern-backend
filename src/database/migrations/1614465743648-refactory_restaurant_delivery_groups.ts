import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryRestaurantDeliveryGroups1614465743648 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurant_delivery_groups\` ` +
        `ADD COLUMN \`estimated\` VARCHAR(255) NOT NULL AFTER \`price\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurant_delivery_groups\` ` +
            `DROP COLUMN \`estimated\`;`);
    }

}
