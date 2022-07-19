## API Endpoints

1-Products

-Index : '/products' [GET]
-Show : '/products/:id' [GET]
-Create : [token required] : '/products/create' [POST]

2- Users

-Index : [token required] '/users' [GET]
-Show : [token required] '/users/:id' [GET]
-Create : '/users/create' [POST]

3- Orders

-Index : '/orders' [GET]
-Current Order By User : [token required] 'orders/:id' [GET]
-Active Order by user : [token required] '/orders/:id/active' [GET]
-complete Order by user : [token required] '/users/:id/complete' [GET]
-Create : [token required] '/orders/create' [POST]

## Data Shapes

1- Products Table

    id: SERIAL PRIMARY KEY,
    name: VARCHAR(50) NOT NULL,
    price: NUMERIC NOT NULL,
    category: VARCHAR(50)

2- Users Table

    id: SERIAL PRIMARY KEY,
    firstName: VARCHAR(50) NOT NULL,
    lastName: VARCHAR(50) NOT NULL,
    password: VARCHAR(60) NOT NULL

3- Orders Table

    id: SERIAL PRIMARY KEY,
    product_id: INTEGER NOT NULL FOREIGN KEY to PRODUCTS,
    quantity: INTEGER NOT NULL,
    user_id: INTEGER NOT NULL FOREIGN KEY to USERS,
    status: ENUM ('active','complete') NOT NULL



