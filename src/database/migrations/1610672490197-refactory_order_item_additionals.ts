import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryOrderItemAdditionals1610672490197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item_additionals\` CHANGE COLUMN \`value\` \`value\` DECIMAL(10,2) NOT NULL ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item_additionals\` CHANGE COLUMN \`value\` \`value\` DECIMAL(10,0) NOT NULL ;`);
    }

}