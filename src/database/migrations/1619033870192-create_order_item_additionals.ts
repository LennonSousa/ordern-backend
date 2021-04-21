import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrderItemAdditionals1619033870192 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'order_item_additionals',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'amount',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'value',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00
                },
                {
                    name: 'order_item_id',
                    type: 'integer',
                    unsigned: true,
                }
            ],
            foreignKeys: [
                {
                    name: 'OrderItemAdditional',
                    columnNames: ['order_item_id'],
                    referencedTableName: 'order_items',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_item_additionals');
    }

}
