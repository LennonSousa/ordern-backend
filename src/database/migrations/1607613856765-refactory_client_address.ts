import {MigrationInterface, QueryRunner} from "typeorm";

export class refactoryClientAddress1607613856765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client_address\` CHANGE COLUMN \`number\` \`number\` VARCHAR(255) NULL, CHANGE COLUMN \`group\` \`group\` VARCHAR(255) NULL, CHANGE COLUMN \`complement\` \`complement\` VARCHAR(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client_address\` CHANGE COLUMN \`number\` \`number\` VARCHAR(255) NOT NULL, CHANGE COLUMN \`group\` \`group\` VARCHAR(255) NOT NULL, CHANGE COLUMN \`complement\` \`complement\` VARCHAR(255) NOT NULL`); // reverts things made in "up" method
    }
}
