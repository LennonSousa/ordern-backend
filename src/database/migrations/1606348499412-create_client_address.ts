import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createClientAddress1606348499412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'client_address',
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
                    name: 'zip_code',
                    type: 'varchar'
                },
                {
                    name: 'street',
                    type: 'varchar'
                },
                {
                    name: 'number',
                    type: 'varchar'
                },
                {
                    name: 'group',
                    type: 'varchar'
                },
                {
                    name: 'complement',
                    type: 'varchar'
                },
                {
                    name: 'city',
                    type: 'varchar'
                },
                {
                    name: 'country',
                    type: 'varchar'
                },
                {
                    name: 'type',
                    type: 'varchar'
                },
                {
                    name: 'client_id',
                    type: 'integer',
                    unsigned: true,
                }
            ],
            foreignKeys: [
                {
                    name: 'Client',
                    columnNames: ['client_id'],
                    referencedTableName: 'clients',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('client_address');
    }

}
