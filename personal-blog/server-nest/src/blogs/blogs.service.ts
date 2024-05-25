import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Connection, Model } from 'mongoose';
import { Blog } from './schemas/blog.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: Model<Blog>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    try {
      const existingBlog = await this.blogModel
        .findOne({ title: createBlogDto.title })
        .exec();
      if (existingBlog) {
        throw new ConflictException('Blog title already exists');
      }

      const newBlog = new this.blogModel(createBlogDto);
      const createdBlog = await newBlog.save();

      return createdBlog;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'An error occurred while creating the blog',
        );
      }
    }
  }

  async findAll(): Promise<Blog[]> {
    try {
      const blogs = await this.blogModel.find().exec();
      return blogs;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while fetching blogs',
      );
    }
  }

  async findOne(id: string): Promise<Blog | null> {
    try {
      const blog = await this.blogModel.findById(id).exec();
      if (!blog) {
        throw new NotFoundException('Blog not found');
      }
      return blog;
    } catch (error) {
      if (error.name === 'NotFoundException') {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'An error occurred while finding the blog',
        );
      }
    }
  }

  async update(id, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    try {
      const existingBlog = await this.blogModel
        .findOne({ title: updateBlogDto.title, _id: { $ne: id } })
        .exec();
      if (existingBlog) {
        throw new ConflictException('A blog with this title already exists');
      }

      const updatedBlog = await this.blogModel
        .findByIdAndUpdate(id, updateBlogDto, { new: true })
        .exec();

      if (!updatedBlog) {
        throw new NotFoundException('Blog not found');
      }

      return updatedBlog;
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'An error occurred while updating the blog',
        );
      }
    }
  }

  async remove(id): Promise<Blog> {
    try {
      const deletedBlog = await this.blogModel.findByIdAndDelete(id);
      if (!deletedBlog) {
        throw new NotFoundException('Blog not found');
      }
      return deletedBlog;
    } catch (error) {
      if (error.name === 'NotFoundException') {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'An error occurred while deleting the blog',
        );
      }
    }
  }
}
