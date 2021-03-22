import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoryCustomers1616435397700 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` ` +
            `ADD COLUMN \`created_at\` DATETIME NOT NULL AFTER \`paused\` ;`);

        await queryRunner.query(`ALTER TABLE \`users\` ` +
            `ADD COLUMN \`created_at\` DATETIME NOT NULL AFTER \`paused\` ;`);

        await queryRunner.query(`ALTER TABLE \`orders\` ` +
            `ADD COLUMN \`placed_at\` DATETIME NOT NULL AFTER \`delivery_in\`, ` +
            `ADD COLUMN \`cancelled_at\` DATETIME NOT NULL AFTER \`reason_cancellation\`, ` +
            `CHANGE COLUMN \`ordered\` \`ordered_at\` DATETIME NOT NULL , ` +
            `CHANGE COLUMN \`delivery\` \`delivery_in\` DATETIME NOT NULL , ` +
            `CHANGE COLUMN \`delivered\` \`delivered_at\` DATETIME NOT NULL ; `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` ` +
            `DROP COLUMN \`created_at\`;`);

        await queryRunner.query(`ALTER TABLE \`users\` ` +
        `DROP COLUMN \`created_at\`;`);

        await queryRunner.query(`ALTER TABLE \`orders\` ` +
            `DROP COLUMN \`placed_at\` , ` +
            `DROP COLUMN \`cancelled_at\` , ` +
            `CHANGE COLUMN \`ordered_at\` \`ordered\` DATETIME NOT NULL , ` +
            `CHANGE COLUMN \`delivery_in\` \`delivery\` DATETIME NOT NULL , ` +
            `CHANGE COLUMN \`delivered_at\` \`delivered\` DATETIME NOT NULL ; `);
    }

}
