import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCustomerReset1611618144184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'customer_reset',
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
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'token',
                    type: 'varchar',
                },
                {
                    name: 'expire',
                    type: 'datetime',
                },
                {
                    name: 'activated',
                    type: 'boolean',
                    default: false,
                }

            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
