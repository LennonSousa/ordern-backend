import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryCustomerNew1608067823076 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer_new\` CHANGE COLUMN \`expire\` \`expire\` DATETIME NOT NULL ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer_new\` CHANGE COLUMN \`expire\` \`expire\` DATE NOT NULL ;`);
    }

}
