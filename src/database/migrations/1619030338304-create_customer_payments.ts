import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCustomerPayments1619030338304 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'customer_payments',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'card_number',
                    type: 'varchar(500)'
                },
                {
                    name: 'brand',
                    type: 'varchar(45)'
                },
                {
                    name: 'exp_month',
                    type: 'varchar(2)'
                },
                {
                    name: 'exp_year',
                    type: 'varchar(4)'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'cpf',
                    type: 'varchar'
                },
                {
                    name: 'customer_id',
                    type: 'varchar',
                }
            ],
            foreignKeys: [
                {
                    name: 'CustomerPayment',
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
        await queryRunner.dropTable('customer_payments');
    }

}
