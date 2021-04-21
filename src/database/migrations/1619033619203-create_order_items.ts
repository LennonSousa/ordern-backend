import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrderItems1619033619203 implements MigrationInterface {

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
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'value',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'notes',
                    type: 'varchar',
                },
                {
                    name: 'order_id',
                    type: 'varchar',
                }
            ],
            foreignKeys: [
                {
                    name: 'OrderItem',
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
