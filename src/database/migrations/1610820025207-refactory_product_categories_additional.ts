import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryProductCategoriesAdditional1610820025207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_categories_additional\` ADD COLUMN \`repeat\` TINYINT(1) NULL DEFAULT '1' AFTER \`max\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_categories_additional\` DROP COLUMN \`repeat\`;`);
    }

}
