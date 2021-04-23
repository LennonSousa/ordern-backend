import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrders1619032951368 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orders',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'customer_id',
                    type: 'varchar',
                },
                {
                    name: 'customer',
                    type: 'varchar'
                },
                {
                    name: 'ordered_at',
                    type: 'datetime',
                    default: 'now()',
                },
                {
                    name: 'delivery_in',
                    type: 'datetime',
                    default: 'now()',
                },
                {
                    name: 'placed_at',
                    type: 'datetime',
                    default: 'now()',
                },
                {
                    name: 'delivered_at',
                    type: 'datetime',
                    default: 'now()',
                },
                {
                    name: 'sub_total',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'cupom',
                    type: 'varchar',
                },
                {
                    name: 'delivery_tax',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'delivery_type',
                    type: 'text',
                },
                {
                    name: 'delivery_estimated',
                    type: 'integer',
                },
                {
                    name: 'discount',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'fee',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'total',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'payment',
                    type: 'varchar',
                },
                {
                    name: 'payment_type',
                    type: 'varchar'
                },
                {
                    name: 'paid',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'address',
                    type: 'varchar'
                },
                {
                    name: 'reason_cancellation',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'cancelled_at',
                    type: 'datetime',
                    default: 'now()',
                },
                {
                    name: 'order_status_id',
                    type: 'integer',
                    unsigned: true,
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
