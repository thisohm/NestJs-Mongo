import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<import("./schemas/product.schema").Product>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/product.schema").ProductDocument> & import("./schemas/product.schema").Product & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | {
        message: string;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/product.schema").ProductDocument> & import("./schemas/product.schema").Product & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
