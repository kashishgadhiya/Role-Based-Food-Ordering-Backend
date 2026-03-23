# Role-Based Food Ordering Backend

A backend API for a food ordering platform with **role-based access control (RBAC)** and **country-level access restrictions**, built with NestJS, GraphQL, and Prisma.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | NestJS |
| API | GraphQL (Apollo Server) |
| ORM | Prisma |
| Database | SQLite |
| Language | TypeScript |

---

## Features

- **View Restaurants & Menus** — Browse restaurants and menu items
- **Create Orders** — Add food items and place an order
- **Checkout & Pay** — Complete an order using a saved payment method
- **Cancel Orders** — Cancel an existing order
- **Manage Payment Methods** — Add or update payment methods
- **Role-Based Access** — Each feature is restricted by user role (Admin / Manager / Member)
- **Country-Level Access** — Managers and Members can only access restaurants and orders within their assigned country

---

## Role Permissions

| Feature | Admin | Manager | Member |
|---------|:-----:|:-------:|:------:|
| View restaurants & menu items | ✅ | ✅ | ✅ |
| Create an order | ✅ | ✅ | ✅ |
| Checkout & pay | ✅ | ✅ | ❌ |
| Cancel an order | ✅ | ✅ | ❌ |
| Add / Modify payment methods | ✅ | ❌ | ❌ |

---

## Country-Level Access

Users are assigned a country (`INDIA` or `AMERICA`). Managers and Members can only view and interact with restaurants in their own country. Admins have global access.

---

## Local Setup

### Prerequisites
- Node.js v18+
- npm

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Run database migrations
npx prisma migrate dev --name init

# 4. Seed the database
npx prisma db seed

# 5. Start the server
npm run start:dev
```

Open **http://localhost:3000/graphql** in your browser to access the GraphQL Playground.

---

## Authentication

The API uses header-based mock authentication. Pass the user ID in the request header:

```json
{
  "x-user-id": "1"
}
```

Add this in the **HTTP HEADERS** tab at the bottom of the GraphQL Playground.

### Pre-seeded Users

| ID | Name | Role | Country |
|----|------|------|---------|
| `1` | Nick Fury | ADMIN | ALL |
| `2` | Captain Marvel | MANAGER | INDIA |
| `3` | Captain America | MANAGER | AMERICA |
| `4` | Thanos | MEMBER | INDIA |
| `5` | Thor | MEMBER | INDIA |
| `6` | Travis | MEMBER | AMERICA |

### Pre-seeded Restaurants

| ID | Name | Country | Menu Items |
|----|------|---------|------------|
| `r1` | Delhi Darbar | INDIA | Butter Chicken ($15), Palak Paneer ($12) |
| `r2` | Burger King | AMERICA | Whopper ($8), Fries ($4) |

---

## API Reference

### Queries

#### Get current user
```graphql
query {
  me {
    id
    name
    role
    country
  }
}
```

#### List restaurants
```graphql
query {
  restaurants {
    id
    name
    country
    menuItems {
      id
      name
      price
    }
  }
}
```

#### Get menu items for a restaurant
```graphql
query {
  menuItems(restaurantId: "r1") {
    id
    name
    price
  }
}
```

---

### Mutations

#### Create an order
```graphql
mutation {
  createOrder(input: {
    restaurantId: "r1",
    items: [
      { menuItemId: "<menuItemId>", quantity: 2 }
    ]
  }) {
    id
    status
    totalAmount
  }
}
```

#### Checkout an order
```graphql
mutation {
  checkoutOrder(orderId: "<orderId>") {
    id
    status
    totalAmount
  }
}
```

#### Cancel an order
```graphql
mutation {
  cancelOrder(orderId: "<orderId>") {
    id
    status
  }
}
```

#### Add a payment method
```graphql
mutation {
  addPaymentMethod(
    userId: "1",
    provider: "Stripe",
    details: "card ending 4242"
  ) {
    id
    provider
    details
  }
}
```

#### Update a payment method
```graphql
mutation {
  updatePaymentMethod(
    id: "<paymentMethodId>",
    provider: "PayPal",
    details: "user@email.com"
  ) {
    id
    provider
    details
  }
}
```

---

## Project Structure

```
food-ordering-backend/
├── prisma/
│   ├── schema.prisma       # Data models
│   └── seed.ts             # Seed users, restaurants, and menu items
├── src/
│   ├── auth/               # AuthGuard, RolesGuard, decorators
│   ├── restaurants/        # Restaurants & menu item resolvers
│   ├── orders/             # Order management resolvers
│   ├── payments/           # Payment method resolvers
│   ├── users/              # User resolver (me query)
│   ├── prisma/             # Shared Prisma service
│   └── app.module.ts       # Root module
└── package.json
```
