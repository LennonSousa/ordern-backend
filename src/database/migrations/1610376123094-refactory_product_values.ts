import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryProductValues1610376123094 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_values\` CHANGE COLUMN \`value\` \`value\` DECIMAL(10,2) NOT NULL DEFAULT '0' ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_values\` CHANGE COLUMN \`value\` \`value\` DECIMAL(10,0) NOT NULL DEFAULT '0' ;`);
    }

}
