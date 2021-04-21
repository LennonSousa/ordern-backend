import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createAdditionals1619026972653 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'additionals',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'code',
                    type: 'varchar'
                },
                {
                    name: 'paused',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'store_id',
                    type: 'varchar'
                }
            ],
            foreignKeys: [
                {
                    name: 'StoreAdditional',
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
        await queryRunner.dropTable('additionals');
    }

}
