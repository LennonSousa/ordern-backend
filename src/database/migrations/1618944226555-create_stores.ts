import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createStores1618944226555 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'stores',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
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
                    type: 'varchar'
                },
                {
                    name: 'min_order',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'cover',
                    type: 'varchar',
                },
                {
                    name: 'avatar',
                    type: 'varchar',
                },
                {
                    name: 'zip_code',
                    type: 'varchar'
                },
                {
                    name: 'street',
                    type: 'varchar'
                },
                {
                    name: 'number',
                    type: 'varchar'
                },
                {
                    name: 'group',
                    type: 'varchar'
                },
                {
                    name: 'complement',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'city',
                    type: 'varchar'
                },
                {
                    name: 'state',
                    type: 'varchar'
                },
                {
                    name: 'latitude',
                    type: 'varchar'
                },
                {
                    name: 'longitude',
                    type: 'varchar'
                },
                {
                    name: 'free_shipping',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'highlights',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'highlights_title',
                    type: 'varchar',
                    default: '\'Destaques\'',
                },
                {
                    name: 'published_at',
                    type: 'datetime',
                    default: 'Now()',
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('stores');
    }

}
