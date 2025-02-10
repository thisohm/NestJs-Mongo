import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order, OrderDocument } from "./schemas/order.schema";
import { Model } from "mongoose";
import { ProductsService } from "src/products/products.service";
export declare class OrdersService {
    private orderModel;
    private productsService;
    constructor(orderModel: Model<OrderDocument>, productsService: ProductsService);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, OrderDocument> & Order & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | {
        message: string;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, OrderDocument> & Order & import("mongoose").Document<unknown, any, any> & Required<{
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
