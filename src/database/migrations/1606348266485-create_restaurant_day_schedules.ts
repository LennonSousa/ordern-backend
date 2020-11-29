import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createRestaurantDaySchedules1606348266485 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'restaurant_day_schedules',
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
                    name: 'WeekDay',
                    columnNames: ['week_day_id'],
                    referencedTableName: 'restaurant_opened_days',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('restaurant_day_schedules');
    }

}
