import { Injectable } from "@nestjs/common";
import { CreateOrderDto, CreateOrderItemDto } from "./dto/create-order";
import { OrderItem } from "./entities/order-item.entity";
import { Order, OrderStatus } from "./entities/order-entity";
import { GuestCheckService } from "../guest-checks/guest-check.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductService } from "../products/product.service";

@Injectable()
export class OrderService {
    constructor(
        private readonly guestCheckService: GuestCheckService,
        private readonly productService: ProductService,

        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>
    ) {}


    private async prepareItems(dto: CreateOrderItemDto): Promise<OrderItem> {
        const product = await this.productService.findOne(dto.productId);
        const subtotal = dto.quantity * product.price;

        return this.orderItemRepository.create({
            product,
            quantity: dto.quantity,
            subtotal
        })
    }


    async create(dto: CreateOrderDto): Promise<Order>{
        // Regra 1 -- Valida se existe comanda em aberto para a mesa
        const guestCheck = await this.guestCheckService.findOrCreateOpened(dto.spotID);

        // Monta o totalizador do pedido
        const items: OrderItem[] = [];
        let total = 0;

        for (const itemDto of dto.items) {
            const item = await this.prepareItems(itemDto);
            items.push(item);
            total += Number(item.subtotal)
        }

        // Monta o pedido
        const order = this.orderRepository.create({
            guestCheck,
            status: OrderStatus.NEW,
            total,
            items
        })

        // Gravar no banco o pedido
        return this.orderRepository.save(order);
    }
}