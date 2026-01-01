import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookInput, UpdateBookInput } from './dto/book.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

/**
 * BooksResolver
 * GraphQL resolver for Book operations
 * All operations are protected by Auth0 JWT authentication
 */
@Resolver(() => Book)
@UseGuards(GqlAuthGuard) // Protect all routes with Auth0 authentication
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  /**
   * Query: Get all books
   * Returns a list of all books in the database
   */
  @Query(() => [Book], { name: 'books', description: 'Get all books' })
  async findAll(@CurrentUser() user: any): Promise<Book[]> {
    // User is authenticated at this point
    return this.booksService.findAll();
  }

  /**
   * Query: Get a single book by ID
   */
  @Query(() => Book, { name: 'book', description: 'Get a single book by ID' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: any,
  ): Promise<Book> {
    return this.booksService.findOne(id);
  }

  /**
   * Mutation: Create a new book
   * Requires authentication
   */
  @Mutation(() => Book, { description: 'Create a new book' })
  async createBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
    @CurrentUser() user: any,
  ): Promise<Book> {
    return this.booksService.create(createBookInput);
  }

  /**
   * Mutation: Update an existing book
   * Requires authentication
   */
  @Mutation(() => Book, { description: 'Update an existing book' })
  async updateBook(
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
    @CurrentUser() user: any,
  ): Promise<Book> {
    return this.booksService.update(updateBookInput);
  }

  /**
   * Mutation: Delete a book
   * Requires authentication
   * Returns true on successful deletion
   */
  @Mutation(() => Boolean, { description: 'Delete a book' })
  async deleteBook(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: any,
  ): Promise<boolean> {
    return this.booksService.remove(id);
  }
}
