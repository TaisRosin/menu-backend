import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsPositive, IsUUID, Validate, ValidateNested } from "class-validator";

export class CreateOrderItemDto {
    @IsUUID()
    productId: string;

    @IsInt()
    @IsPositive()
    quantity: number;


}

export class CreateOrderDto {
    @IsUUID()
    spotID: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];
}