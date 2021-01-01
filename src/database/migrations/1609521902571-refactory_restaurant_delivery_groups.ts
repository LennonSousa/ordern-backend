import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryRestaurantDeliveryGroups1609521902571 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurant_delivery_groups\` CHANGE COLUMN \`price\` \`price\` DECIMAL(10,2) NOT NULL ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurant_delivery_groups\` CHANGE COLUMN \`price\` \`price\` DECIMAL(10,0) NOT NULL ;`);
    }

}
