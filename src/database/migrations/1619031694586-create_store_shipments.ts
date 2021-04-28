import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createStoreShipments1619031694586 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'store_shipments',
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
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'code',
                    type: 'varchar'
                },
                {
                    name: 'active',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'default_price',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'store_id',
                    type: 'varchar'
                },
            ],
            foreignKeys: [
                {
                    name: 'StoreShipment',
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
        await queryRunner.dropTable('store_shipments');
    }

}
