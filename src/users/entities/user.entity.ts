import { ObjectType, Field } from '@nestjs/graphql';
import {  Column, DataType, Model, Table } from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'users' })
export class User extends Model {

  @Field(() => String)
  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Field(() => String)
  @Column(DataType.STRING)
  password: string;

  @Field(() => String)
  @Column(DataType.STRING)
  token: string;

  @Field(() => String)
  @Column(DataType.STRING)
  profilePicture: string;
}
