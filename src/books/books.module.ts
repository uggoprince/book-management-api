import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { AuthModule } from '../auth/auth.module';

/**
 * BooksModule
 * Feature module for book management
 * Provides GraphQL API for CRUD operations on books
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Book]), // Register Book entity with TypeORM
    AuthModule, // Import Auth module for guards
  ],
  providers: [BooksService, BooksResolver],
  exports: [BooksService],
})
export class BooksModule {}
