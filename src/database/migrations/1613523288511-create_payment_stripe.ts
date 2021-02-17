import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPaymentStripe1613523288511 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'payment_stripe',
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
                    name: 'pk_live',
                    type: 'varchar'
                },
                {
                    name: 'sk_live',
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
        await queryRunner.dropTable('payment_stripe');
    }

}
