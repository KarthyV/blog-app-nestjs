import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';
import { BlogDto } from './dto/blog.dto';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog) private blogRepo: typeof Blog
  ) {}
  async create(createBlogInput: CreateBlogInput, user: any) {
    const { userId } = user;
    if(!userId) throw new UnauthorizedException('Access denied');
    const createBlog = this.blogRepo.build({ ...createBlogInput, userId });
    await createBlog.save();
    const data = await this.findOne(createBlog.id);
    return data;
  }

  async findAll(): Promise<BlogDto[]> {
    const blogs = await this.blogRepo.findAll({ include: [
      {
        model: User,
        attributes: ['name', 'email']
      }], raw: true });
    return blogs.map((blog) => this.mapToBlogDto(blog));
  }

  async findOne(id: number): Promise<BlogDto> {
    const blog = await this.blogRepo.findOne({ where: { id }, include: [
      {
        model: User,
        attributes: ['name', 'email']
      }
    ] , raw: true });
    return this.mapToBlogDto(blog); 
  }

  private mapToBlogDto(blog: Blog): BlogDto {
    return {
      title: blog.title,
      content: blog.content,
      imageUrl: blog.imageUrl,
      user: {
        name: blog['user.name'] || "",
        email: blog['user.email'] || "",
      }, 
    };
  }

  async update(blogId: number, updateBlogInput: UpdateBlogInput) {
   const [updatedCount] = await this.blogRepo.update(updateBlogInput, { where: { id: blogId } });
    if (updatedCount === 0) throw new NotFoundException('No blog found to update');
    return await this.findOne(blogId);
  }

  async remove(id: number) {
    const deleted = await this.blogRepo.destroy({ where: { id } });
    if(!deleted) throw new NotFoundException('No blog found to delete');
    return await this.findAll();
  }
}
