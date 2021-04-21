import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProducts1619009660332 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'maiority',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'code',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'price_one',
                    type: 'boolean',
                    default: true
                },
                {
                    name: 'price',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00
                },
                {
                    name: 'discount',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'discount_price',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'paused',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'order',
                    type: 'integer'
                },
                {
                    name: 'available_all',
                    type: 'boolean',
                    default: true
                },
                {
                    name: 'on_request',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'Now()',
                },
                {
                    name: 'category_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'ProductCategory',
                    columnNames: ['category_id'],
                    referencedTableName: 'categories',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }

}
