import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCustomers1619029623782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'customers',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'cpf',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'birth',
                    type: 'date',
                },
                {
                    name: 'phone',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'active',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'paused',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'Now()',
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('customers');
    }

}
