import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryRestaurants1610383755662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurants\` CHANGE COLUMN \`min_order\` \`min_order\` DECIMAL(10,2) NOT NULL DEFAULT '0' ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurants\` CHANGE COLUMN \`min_order\` \`min_order\` DECIMAL(10,0) NOT NULL ;`);
    }

}
