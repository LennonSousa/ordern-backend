import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProductAdditionals1619028935798 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product_additionals',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'pdv',
                    type: 'varchar',
                    isNullable: true,
                }
                ,
                {
                    name: 'price',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'order',
                    type: 'integer',
                },
                {
                    name: 'additional_id',
                    type: 'varchar',
                },
                {
                    name: 'category_id',
                    type: 'varchar',
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
                    name: 'CategoryAdditional',
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
