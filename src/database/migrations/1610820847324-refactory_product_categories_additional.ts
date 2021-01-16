import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryProductCategoriesAdditional1610820847324 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_categories_additional\` CHANGE COLUMN \`repeat\` \`repeat\` TINYINT(1) NOT NULL DEFAULT '0' ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_categories_additional\` CHANGE COLUMN \`repeat\` \`repeat\` TINYINT(1) NULL DEFAULT '1' ;`);
    }

}
