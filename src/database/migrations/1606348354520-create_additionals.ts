import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAdditionals1606348354520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'additionals',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'code',
                    type: 'varchar'
                },
                {
                    name: 'paused',
                    type: 'boolean',
                    default: false,
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('additionals');
    }

}
