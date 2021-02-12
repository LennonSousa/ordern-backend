import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoryOrders1613139090113 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ` +
            `CHANGE COLUMN \`sub_total\` \`sub_total\` DECIMAL(10,2) NOT NULL , ` +
            `CHANGE COLUMN \`delivery_tax\` \`delivery_tax\` DECIMAL(10,2) NOT NULL , ` +
            `CHANGE COLUMN \`fee\` \`fee\` DECIMAL(10,2) NOT NULL , ` +
            `CHANGE COLUMN \`total\` \`total\` DECIMAL(10,2) NOT NULL ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ` +
            `CHANGE COLUMN \`sub_total\` \`sub_total\` DECIMAL(10,0) NOT NULL , ` +
            `CHANGE COLUMN \`delivery_tax\` \`delivery_tax\` DECIMAL(10,0) NOT NULL , ` +
            `CHANGE COLUMN \`fee\` \`fee\` DECIMAL(10,0) NOT NULL , ` +
            `CHANGE COLUMN \`total\` \`total\` DECIMAL(10,0) NOT NULL ;`);
    }

}
