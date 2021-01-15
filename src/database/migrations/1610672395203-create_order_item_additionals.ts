import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrderItemAdditionals1610672395203 implements MigrationInterface {

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
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'value',
                    type: 'decimal',
                    scale: 2,
                },
                {
                    name: 'order_item_id',
                    type: 'integer',
                    unsigned: true,
                }
            ],
            foreignKeys: [
                {
                    name: 'OrderItem',
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
