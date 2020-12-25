import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryCustomers1608923752689 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clients\` RENAME TO  \`customers\` ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clients\` RENAME TO  \`clients\` ;`);
    }

}
