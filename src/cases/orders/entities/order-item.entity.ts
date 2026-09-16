import { Product } from "src/cases/products/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order-entity";

@Entity('order_item')
export class OrderItem {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order, {nullable: false})
    @JoinColumn({name: 'order_id'})
    order: Order;

    @ManyToOne(() => Product, {nullable: false})
    @JoinColumn({name: 'product_id'})
    product: Product;

    @Column({type: 'integer'})
    quantity: number;

    @Column({type: 'numeric', precision: 10, scale: 2})
    price: number;

    @Column({type: 'numeric', precision: 10, scale: 2})
    subtotal: number;
}