"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const order_schema_1 = require("./schemas/order.schema");
const mongoose_2 = require("mongoose");
const products_service_1 = require("../products/products.service");
let OrdersService = class OrdersService {
    constructor(orderModel, productsService) {
        this.orderModel = orderModel;
        this.productsService = productsService;
    }
    async create(createOrderDto) {
        const productResult = await this.productsService.findOne(createOrderDto.productId);
        if (!productResult) {
            throw new common_1.NotFoundException("Product ID not found");
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
    async findOne(id) {
        const order = await this.orderModel
            .findById(id)
            .populate("productId")
            .exec();
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async update(id, updateOrderDto) {
        const order = await this.orderModel
            .findByIdAndUpdate(id, updateOrderDto, { new: true })
            .exec();
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return { message: `Update order ${id} success.` };
    }
    async remove(id) {
        const order = await this.orderModel.findByIdAndDelete(id).exec();
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return { message: `Delete order ${id} success.` };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map