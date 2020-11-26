import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrderStatus1606348552555 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'order_status',
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
                    name: 'title',
                    type: 'varchar'
                }
                ,
                {
                    name: 'description',
                    type: 'varchar'
                }
                ,
                {
                    name: 'order',
                    type: 'integer'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_status');
    }

}
