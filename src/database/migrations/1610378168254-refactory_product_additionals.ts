import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryProductAdditionals1610378168254 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_additionals\` CHANGE COLUMN \`price\` \`price\` DECIMAL(10,2) NOT NULL DEFAULT '0' ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_additionals\` CHANGE COLUMN \`price\` \`price\` DECIMAL(10,0) NOT NULL ;`);
    }

}
