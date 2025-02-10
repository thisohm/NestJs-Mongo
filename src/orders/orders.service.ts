import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order, OrderDocument } from "./schemas/order.schema";
import { Model } from "mongoose";

import { ProductsService } from "src/products/products.service";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const productResult = await this.productsService.findOne(
      createOrderDto.productId,
    );
    if (!productResult) {
      throw new NotFoundException("Product ID not found");
    }

    const resultOrder = new this.orderModel(createOrderDto);
    return await resultOrder.save();
  }

  async findAll() {
    const order = await this.orderModel.find().exec();
    if (order.length === 0) {
      return { message: "Not have orders." };
    }
    return order;
  }

  async findOne(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate("productId")
      .exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return { message: `Update order ${id} success.` };
  }

  async remove(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return { message: `Delete order ${id} success.` };
  }
}
