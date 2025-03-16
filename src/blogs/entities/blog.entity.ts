import { ObjectType, Field, } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Table({ tableName: 'blogs' })
export class Blog extends Model {
  @Field(() => String)
  @Column(DataType.STRING)
  title: string;

  @Field(() => String)
  @Column(DataType.STRING)
  content: string;

  @Field(() => String)
  @Column(DataType.STRING)
  imageUrl: string;



  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  @Field(() => User)
  user?: User;
}
