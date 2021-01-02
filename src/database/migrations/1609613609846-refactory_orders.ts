import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryOrders1609613609846 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE COLUMN \`descount\` \`discount\` DECIMAL(10,2) NOT NULL ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE COLUMN \`discount\` \`descount\` DECIMAL(10,2) NOT NULL ;`);
    }

}
