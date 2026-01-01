import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsInt,
} from 'class-validator';

/**
 * Input type for creating a new book
 */
@InputType()
export class CreateBookInput {
  @Field({ description: 'Name/title of the book' })
  @IsNotEmpty({ message: 'Book name is required' })
  @IsString()
  @MinLength(1, { message: 'Book name must not be empty' })
  name: string;

  @Field({ description: 'Description of the book' })
  @IsNotEmpty({ message: 'Book description is required' })
  @IsString()
  description: string;
}

/**
 * Input type for updating an existing book
 * All fields are optional - only provided fields will be updated
 */
@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => Int, { description: 'ID of the book to update' })
  @IsInt()
  id: number;

  @Field({ nullable: true, description: 'Updated name/title of the book' })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Book name must not be empty' })
  name?: string;

  @Field({ nullable: true, description: 'Updated description of the book' })
  @IsOptional()
  @IsString()
  description?: string;
}
