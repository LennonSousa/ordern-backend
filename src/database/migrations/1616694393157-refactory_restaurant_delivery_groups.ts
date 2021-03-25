import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryRestaurantDeliveryGroups1616694393157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurant_delivery_groups\` ` +
        `CHANGE COLUMN \`estimated\` \`estimated\` INT NOT NULL ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurant_delivery_groups\` ` +
            `CHANGE COLUMN \`estimated\` \`estimated\` VARCHAR(255) NOT NULL ; `);
    }

}
