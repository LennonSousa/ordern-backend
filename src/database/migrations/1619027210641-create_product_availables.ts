import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProductAvailables1619027210641 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product_availables',
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
                    name: 'week_day',
                    type: 'integer'
                },
                {
                    name: 'available',
                    type: 'boolean',
                    default: true
                },
                {
                    name: 'all_day',
                    type: 'boolean',
                    default: true
                },
                {
                    name: 'shift_01',
                    type: 'boolean',
                    default: true
                },
                {
                    name: 'shift_01_from',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'shift_01_to',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'shift_02',
                    type: 'boolean',
                    default: true
                },
                {
                    name: 'shift_02_from',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'shift_02_to',
                    type: 'integer',
                    default: 0
                }
                ,
                {
                    name: 'product_id',
                    type: 'varchar',
                }
            ],
            foreignKeys: [
                {
                    name: 'ProductAvailable',
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
        await queryRunner.dropTable('product_availables');
    }

}
