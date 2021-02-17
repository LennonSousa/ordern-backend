import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPaymentsDelivery1613587640214 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'payments_delivery',
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
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('payments_delivery');
    }

}
