import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import UserTypes from './UserTypesModel';
import OpenedDays from './StoreOpenedDaysModel';
import Shipments from './StoreShipmentsModel';
import PaymentsDelivery from './StorePaymentsDeliveryModel';
import OrderStatus from './OrderStatusModel';
import Additionals from './AdditionalsModel';
import Categories from './CategoriesModel';
import ProductsHighlights from './ProductsHighlightsModel';

@Entity('stores')
export default class StoresModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    title: string;

    @Column()
    phone: string;

    @Column()
    description: string;

    @Column()
    min_order: number;

    @Column()
    cover: string;

    @Column()
    avatar: string;

    @Column()
    zip_code: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    group: string;

    @Column()
    complement: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    free_shipping: number;

    @Column()
    highlights: boolean;

    @Column()
    highlights_title: string;

    @Column()
    published_at: Date;

    @OneToMany(() => UserTypes, userType => userType.store, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'store_id' })
    userTypes: UserTypes[];

    @OneToMany(() => OpenedDays, openedDay => openedDay.store, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'store_id' })
    openedDays: OpenedDays[];

    @OneToMany(() => Shipments, shipment => shipment.store, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'store_id' })
    shipments: Shipments[];

    @OneToMany(() => PaymentsDelivery, paymentDelivery => paymentDelivery.store, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'store_id' })
    paymentsDelivery: PaymentsDelivery[];

    @OneToMany(() => OrderStatus, orderStatus => orderStatus.store, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'store_id' })
    orderStatus: OrderStatus[];

    @OneToMany(() => Additionals, additional => additional.store, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'store_id' })
    additionals: Additionals[];

    @OneToMany(() => Categories, category => category.store, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'store_id' })
    categories: Categories[];

    @OneToMany(() => ProductsHighlights, productHighlight => productHighlight.store, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'store_id' })
    productsHighlights: ProductsHighlights[];
}