import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryProducts1610375814214 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE COLUMN \`price\` \`price\` DECIMAL(10,2) NOT NULL , CHANGE COLUMN \`discount_price\` \`discount_price\` DECIMAL(10,2) NOT NULL DEFAULT '0'  ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE COLUMN \`price\` \`price\` DECIMAL(10,0) NOT NULL , CHANGE COLUMN \`discount_price\` \`discount_price\` DECIMAL(10,0) NOT NULL DEFAULT '0'  ;`);
    }

}
