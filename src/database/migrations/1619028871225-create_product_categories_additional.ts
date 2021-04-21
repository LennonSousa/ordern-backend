import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProductCategoriesAdditional1619028871225 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product_categories_additional',
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
                    name: 'min',
                    type: 'integer'
                },
                {
                    name: 'max',
                    type: 'integer'
                },
                {
                    name: 'repeat',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'order',
                    type: 'integer'
                },
                {
                    name: 'product_id',
                    type: 'varchar',
                }
            ],
            foreignKeys: [
                {
                    name: 'ProductCategoryAdditional',
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
