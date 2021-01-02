import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryOrderItems1609613180512 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE COLUMN \`amount\` \`amount\` DECIMAL(10,2) NOT NULL , CHANGE COLUMN \`value\` \`value\` DECIMAL(10,2) NOT NULL ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE COLUMN \`amount\` \`amount\` DECIMAL(10,0) NOT NULL , CHANGE COLUMN \`value\` \`value\` DECIMAL(10,0) NOT NULL ;`);
    }

}
