import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProductsHighlights1619031123534 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products_highlights',
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
                    name: 'active',
                    type: 'boolean',
                    default: true
                },
                {
                    name: 'product_id',
                    type: 'varchar',
                },
                {
                    name: 'store_id',
                    type: 'varchar'
                },
            ],
            foreignKeys: [
                {
                    name: 'ProductHighlight',
                    columnNames: ['product_id'],
                    referencedTableName: 'products',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                {
                    name: 'StoreHighlights',
                    columnNames: ['store_id'],
                    referencedTableName: 'stores',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products_highlights');
    }

}
