import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

/**
 * Book Entity
 * Represents a book in the database and GraphQL schema
 * Uses decorators for both TypeORM (database) and GraphQL (API)
 */
@Entity('books')
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Unique identifier for the book' })
  id: number;

  @Column()
  @Field({ description: 'Name/title of the book' })
  name: string;

  @Column('text')
  @Field({ description: 'Description of the book' })
  description: string;

  @CreateDateColumn()
  @Field({ description: 'Timestamp when the book was created' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field({ description: 'Timestamp when the book was last updated' })
  updatedAt: Date;
}
