import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<import("./schemas/order.schema").Order>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/order.schema").OrderDocument> & import("./schemas/order.schema").Order & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | {
        message: string;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/order.schema").OrderDocument> & import("./schemas/order.schema").Order & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
