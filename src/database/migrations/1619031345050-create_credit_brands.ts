import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCreditBrands1619031345050 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'credit_brands',
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
                    type: 'varchar(45)'
                },
                {
                    name: 'store_id',
                    type: 'varchar'
                },
            ],
            foreignKeys: [
                {
                    name: 'StoreCreditBrands',
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
        await queryRunner.dropTable('credit_brands');
    }

}
