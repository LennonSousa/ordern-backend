import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createStoreOpenedDays1619008281455 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'store_opened_days',
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
                    name: 'week_day',
                    type: 'integer'
                },
                {
                    name: 'opened',
                    type: 'boolean',
                    default: true
                },
                {
                    name: 'store_id',
                    type: 'varchar'
                }
            ],
            foreignKeys: [
                {
                    name: 'StoreOpenedDay',
                    columnNames: ['store_id'],
                    referencedTableName: 'stores',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('store_opened_days');
    }

}
