import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createStoreOpenedSchedules1619008308039 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'store_opened_schedules',
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
                    name: 'from',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'to',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'paused',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'week_day_id',
                    type: 'integer',
                    unsigned: true,
                },
            ],
            foreignKeys: [
                {
                    name: 'OpenedDaySchedule',
                    columnNames: ['week_day_id'],
                    referencedTableName: 'store_opened_days',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('store_opened_schedules');
    }

}
