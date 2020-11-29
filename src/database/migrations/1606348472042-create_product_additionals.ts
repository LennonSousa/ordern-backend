import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProductAdditionals1606348472042 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product_additionals',
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
                    name: 'pdv',
                    type: 'varchar'
                }
                ,
                {
                    name: 'price',
                    type: 'decimal',
                    scale: 2
                },
                {
                    name: 'order',
                    type: 'integer'
                },
                {
                    name: 'additional_id',
                    type: 'integer',
                    unsigned: true,
                },
                {
                    name: 'category_id',
                    type: 'integer',
                    unsigned: true,
                }
            ],
            foreignKeys: [
                {
                    name: 'Additional',
                    columnNames: ['additional_id'],
                    referencedTableName: 'additionals',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                {
                    name: 'CategoryItem',
                    columnNames: ['category_id'],
                    referencedTableName: 'product_categories_additional',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_additionals');
    }

}
