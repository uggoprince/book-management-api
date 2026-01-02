# book-management-api

# Books Dashboard - Backend

A NestJS GraphQL API for managing books with Auth0 authentication.

## Tech Stack

- **NestJS** - Node.js framework
- **GraphQL** - API query language (Apollo Server)
- **TypeORM** - Database ORM
- **SQLite** - Embedded database
- **Auth0** - Authentication & Authorization

## Prerequisites

- Node.js 18+
- npm or yarn
- Auth0 account (free tier available)

## Auth0 Setup

1. Create a free Auth0 account at [auth0.com](https://auth0.com)

2. Create a new **API** in Auth0 Dashboard:
   - Go to Applications > APIs
   - Click "Create API"
   - Name: `Auth Name`
   - Identifier: `Your identifier` (this will be your `AUTH0_AUDIENCE`)
   - Signing Algorithm: RS256

3. Create a new **Application** (for the frontend):
   - Go to Applications > Applications
   - Click "Create Application"
   - Name: `Books Dashboard`
   - Type: `Single Page Application`
   - Note the `Domain` and `Client ID` for frontend configuration


## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your Auth0 credentials
```

## Configuration

Edit the `.env` file with your Auth0 credentials:

```env
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_AUDIENCE=https://books-dashboard-api
PORT=4000
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The GraphQL Playground will be available at: http://localhost:4000/graphql

## GraphQL Schema

### Queries

```graphql
# Get all books
query {
  books {
    id
    name
    description
    createdAt
    updatedAt
  }
}

# Get a single book
query {
  book(id: 1) {
    id
    name
    description
  }
}
```

### Mutations

```graphql
# Create a book
mutation {
  createBook(createBookInput: {
    name: "The Great Gatsby"
    description: "A novel by F. Scott Fitzgerald"
  }) {
    id
    name
    description
  }
}

# Update a book
mutation {
  updateBook(updateBookInput: {
    id: 1
    name: "Updated Book Name"
    description: "Updated description"
  }) {
    id
    name
    description
  }
}

# Delete a book
mutation {
  deleteBook(id: 1)
}
```

## Authentication

All GraphQL operations require a valid Auth0 JWT token. Include the token in the Authorization header:

```
Authorization: Bearer <your-auth0-token>
```

## Project Structure

```
src/
├── auth/
│   ├── auth.module.ts          # Auth module configuration
│   ├── jwt.strategy.ts         # Auth0 JWT validation strategy
│   ├── gql-auth.guard.ts       # GraphQL authentication guard
│   └── current-user.decorator.ts # Decorator to get current user
├── books/
│   ├── book.entity.ts          # Book database entity
│   ├── books.module.ts         # Books feature module
│   ├── books.service.ts        # Business logic
│   ├── books.resolver.ts       # GraphQL resolver
│   └── dto/
│       └── book.input.ts       # Input types for mutations
├── app.module.ts               # Root application module
└── main.ts                     # Application entry point
```

## Deployment

For deployment to services like Render, Fly.io, or Railway:

1. Set environment variables in the deployment platform
2. The SQLite database file will be created automatically
3. For production, consider using PostgreSQL instead of SQLite

## License

MIT