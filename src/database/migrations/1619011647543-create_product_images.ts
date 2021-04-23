import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProductImages1619011647543 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product_images',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'path',
                    type: 'varchar',
                },
                {
                    name: 'order',
                    type: 'integer',
                    default: 0,
                },
                {
                    name: 'product_id',
                    type: 'varchar',
                }
            ],
            foreignKeys: [
                {
                    name: 'ProductImage',
                    columnNames: ['product_id'],
                    referencedTableName: 'products',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_images');
    }

}
