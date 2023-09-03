# book-catallog-backend

Live Link: [https://book-catallog-prisma-backend.vercel.app/](https://book-catallog-prisma-backend.vercel.app/)

## Application Routes:

### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/0843b575-9052-4dae-8dac-e93f93973f2b (Single GET)
- api/v1/users/0843b575-9052-4dae-8dac-e93f93973f2b (PATCH)
- api/v1/users/dbae9e35-f500-4a9b-a7a8-7350877b2e67 (DELETE)
- api/v1/profile/me (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/2210ba49-8867-4abc-ba71-034a031cdc39 (Single GET)
- api/v1/categories/2210ba49-8867-4abc-ba71-034a031cdc39 (PATCH)
- api/v1/categories/97ba0f46-4329-4f90-97fe-73dc2e2a13e3 (DELETE)

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/category/d9adcbba-cdf1-41fb-85d9-6d60f4b1a6cf (GET)
- api/v1/books/09e93b65-b18a-4aef-951e-fc42da679819 (GET)
- api/v1/books/09e93b65-b18a-4aef-951e-fc42da679819 (PATCH)
- api/v1/books/1ce98af3-ade9-48a2-8659-c6515a117acc (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/2702bfc9-deb1-446c-bbad-bfaf046b4ce7 (GET)
