import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrderItems1606348579867 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'order_items',
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
                    name: 'amount',
                    type: 'decimal'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'value',
                    type: 'decimal',
                    scale: 2
                },
                {
                    name: 'additional',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'additional_item',
                    type: 'integer',
                    isNullable: true
                },
                {
                    name: 'order_id',
                    type: 'integer',
                    unsigned: true
                }
            ],
            foreignKeys: [
                {
                    name: 'Order',
                    columnNames: ['order_id'],
                    referencedTableName: 'orders',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_items');
    }

}
