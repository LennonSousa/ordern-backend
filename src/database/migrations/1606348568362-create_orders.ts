import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrders1606348568362 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orders',
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
                    name: 'client_id',
                    type: 'integer'
                },
                {
                    name: 'client',
                    type: 'varchar'
                },
                {
                    name: 'ordered',
                    type: 'datetime'
                },
                {
                    name: 'delivery',
                    type: 'datetime'
                },
                {
                    name: 'delivered',
                    type: 'datetime'
                },
                {
                    name: 'sub_total',
                    type: 'decimal'
                },
                {
                    name: 'cupom',
                    type: 'varchar'
                },
                {
                    name: 'delivery_tax',
                    type: 'decimal'
                },
                {
                    name: 'descount',
                    type: 'decimal'
                },
                {
                    name: 'fee',
                    type: 'decimal'
                },
                {
                    name: 'total',
                    type: 'decimal'
                },
                {
                    name: 'payment',
                    type: 'varchar'
                },
                {
                    name: 'address',
                    type: 'varchar'
                },
                {
                    name: 'reason_cancellation',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'order_status_id',
                    type: 'integer',
                    unsigned: true
                }
            ],
            foreignKeys: [
                {
                    name: 'OrderStatus',
                    columnNames: ['order_status_id'],
                    referencedTableName: 'order_status',
                    referencedColumnNames: ['id'],
                    onUpdate: 'RESTRICT',
                    onDelete: 'RESTRICT',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders');
    }

}
