import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';

@Resolver(() => Blog)
export class BlogsResolver {
  constructor(private readonly blogsService: BlogsService) {}

  @Mutation(() => Blog)
  @UseGuards(AuthGuard)
  createBlog(@Context() request: any, @Args('createBlogInput') createBlogInput: CreateBlogInput): Promise<BlogDto> {
    const user = request.user;
    return this.blogsService.create(createBlogInput, user);
  }

  @Query(() => [Blog], { name: 'blogs' })
  findAll() {
    return this.blogsService.findAll();
  }

  @Query(() => Blog, { name: 'blog' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<BlogDto> {
    const blog = await this.blogsService.findOne(id);
    return blog
  }

  @Mutation(() => Blog)
  @UseGuards(AuthGuard)
  updateBlog(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput): Promise<BlogDto> {
    return this.blogsService.update(updateBlogInput.id, updateBlogInput);
  }

  @Mutation(() => [Blog])
  @UseGuards(AuthGuard)
  async removeBlog(@Args('id', { type: () => Int }) id: number): Promise<BlogDto[]> {
    return await this.blogsService.remove(id);
  }
}
