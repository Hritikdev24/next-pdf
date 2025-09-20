import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  productPrice: number;

  @Prop({ required: true })
  productQty: number;
}


export type ProductDoc=Product & Document;

export const productSchema = SchemaFactory.createForClass(Product);
