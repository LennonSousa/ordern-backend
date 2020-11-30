import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createRestaurants1606348202264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'restaurants',
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
                },
                {
                    name: 'phone',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type:'text'
                },
                {
                    name: 'min_order',
                    type: 'decimal',
                    scale: 2
                },
                {
                    name: 'cover',
                    type:'varchar',
                    isNullable: true
                },
                {
                    name: 'avatar',
                    type:'varchar',
                    isNullable: true
                },
                {
                    name: 'zip_code',
                    type:'varchar'
                },
                {
                    name: 'street',
                    type:'varchar'
                },
                {
                    name: 'number',
                    type:'varchar'
                },
                {
                    name: 'group',
                    type:'varchar'
                },
                {
                    name: 'city',
                    type:'varchar'
                },
                {
                    name: 'country',
                    type:'varchar'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('restaurants');
    }

}
