import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createRestaurantOpenedDays1606348245095 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'restaurant_opened_days',
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
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('restaurant_opened_days');
    }

}
