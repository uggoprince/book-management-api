import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookInput, UpdateBookInput } from './dto/book.input';

/**
 * BooksService
 * Handles all database operations for the Book entity
 * Provides CRUD operations for book management
 */
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  /**
   * Retrieve all books from the database
   * Returns books ordered by creation date (newest first)
   */
  async findAll(): Promise<Book[]> {
    return await this.booksRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Find a single book by its ID
   * Throws NotFoundException if the book doesn't exist
   */
  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id } });
    
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    
    return book;
  }

  /**
   * Create a new book in the database
   */
  async create(createBookInput: CreateBookInput): Promise<Book> {
    const book = await this.booksRepository.create(createBookInput);
    return this.booksRepository.save(book);
  }

  /**
   * Update an existing book
   * Only updates provided fields, preserves other fields
   * Throws NotFoundException if the book doesn't exist
   */
  async update(updateBookInput: UpdateBookInput): Promise<Book> {
    const { id, ...updateData } = updateBookInput;
    
    // First, verify the book exists
    const book = await this.findOne(id);
    
    // Merge the update data with the existing book
    Object.assign(book, updateData);
    
    return this.booksRepository.save(book);
  }

  /**
   * Delete a book from the database
   * Throws NotFoundException if the book doesn't exist
   * Returns true on successful deletion
   */
  async remove(id: number): Promise<boolean> {
    // First, verify the book exists
    await this.findOne(id);

    await this.booksRepository.delete(id);
    return true;
  }
}
