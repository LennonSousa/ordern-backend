import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createRestaurantDeliveryGroups1609519012799 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'restaurant_delivery_groups',
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
                    name: 'description',
                    type: 'varchar'
                }
                ,
                {
                    name: 'price',
                    type: 'decimal',
                    scale: 2
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('restaurant_delivery_groups');
    }

}
