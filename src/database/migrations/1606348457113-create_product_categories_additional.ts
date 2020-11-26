import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProductCategoriesAdditional1606348457113 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product_categories_additional',
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
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'min',
                    type: 'integer'
                },
                {
                    name: 'max',
                    type: 'integer'
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
                    name: 'ProductItem',
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
        await queryRunner.dropTable('product_categories_additional');
    }

}
