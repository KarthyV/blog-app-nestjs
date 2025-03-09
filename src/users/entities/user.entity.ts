import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import {  AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Blog } from 'src/blogs/entities/blog.entity';

@ObjectType()
@Table({ tableName: 'users' })
export class User extends Model {

  @Field(() => Int)
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>

  @Unique('unique_userUniqueId')
  @Column(DataType.STRING)
  @Field(() => String)
  userUniqueId: string

  @Column(DataType.STRING)
  @Field(() => String)
  name: string

  @Field(() => String)
  @Unique('unique_email')
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

  @Field(() => [Blog])
  @HasMany(() => Blog)
  blogs?: Blog[];
}
