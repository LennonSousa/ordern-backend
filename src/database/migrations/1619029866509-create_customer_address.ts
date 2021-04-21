import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCustomerAddress1619029866509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'customer_address',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'zip_code',
                    type: 'varchar'
                },
                {
                    name: 'street',
                    type: 'varchar'
                },
                {
                    name: 'number',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'group',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'complement',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'city',
                    type: 'varchar'
                },
                {
                    name: 'state',
                    type: 'varchar'
                },
                {
                    name: 'type',
                    type: 'varchar'
                },
                {
                    name: 'customer_id',
                    type: 'varchar',
                }
            ],
            foreignKeys: [
                {
                    name: 'CustomerAddress',
                    columnNames: ['customer_id'],
                    referencedTableName: 'customers',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('customer_address');
    }

}
