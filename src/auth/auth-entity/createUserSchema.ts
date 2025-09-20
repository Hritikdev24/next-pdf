import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  userName: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  role: string;
}

export type UserDoc = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
