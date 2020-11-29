import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProductValues1606348441667 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product_values',
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
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'value',
                    type: 'decimal',
                    scale: 2,
                    default: 0.00
                },
                {
                    name: 'order',
                    type: 'integer'
                },
                {
                    name: 'product_id',
                    type: 'integer',
                    unsigned: true,
                }
            ],
            foreignKeys: [
                {
                    name: 'Product',
                    columnNames: ['product_id'],
                    referencedTableName: 'products',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_values');
    }

}
