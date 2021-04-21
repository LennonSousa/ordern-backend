import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createStoreDeliveryGroups1619032405602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'store_delivery_groups',
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
                    type: 'varchar'
                }
                ,
                {
                    name: 'price',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00
                },
                {
                    name: 'estimated',
                    type: 'integer',
                    default: 0,
                },
                {
                    name: 'store_id',
                    type: 'varchar'
                },
            ],
            foreignKeys: [
                {
                    name: 'StoreDeliveryGroups',
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
        await queryRunner.dropTable('store_delivery_groups');
    }

}
