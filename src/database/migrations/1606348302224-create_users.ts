import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1606348302224 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
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
                    name: 'cpf',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'birth',
                    type: 'date'
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'email',
                    type: 'varchar'
                },
                {
                    name: 'password',
                    type: 'varchar'
                },
                {
                    name: 'active',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'paused',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'type_id',
                    type: 'integer',
                    unsigned: true
                }
            ],
            foreignKeys: [
                {
                    name: 'TypeUser',
                    columnNames: ['type_id'],
                    referencedTableName: 'user_types',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
