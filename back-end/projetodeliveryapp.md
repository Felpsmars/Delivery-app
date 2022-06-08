FORMAT: 1A
HOST: https://localhost:3001/

# Projeto Delivery App

Projeto desenvolvido durante o módulo de back-end do curso da Trybe.

## Rotas de Usuário [/]

### Login [POST /login]

+ Request (application/json)

        {
            "email": "zebirita@email.com",
            "password": "$#zebirita#$"
        }

+ Response 200 (application/json)

        {
            "user": {
                "name": "Cliente Zé Birita",
                "email": "zebirita@email.com"
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InplYmlyaXRhQGVtYWlsLmNvbSIsImlhdCI6MTY1NDI5NzIxMSwiZXhwIjoxNjU0MzgzNjExfQ.g3_T6dgoNotgaDwKsF9kwljDrCgi8c5-ihCt3n12tP8",
                "role": "customer" (customer | seller | administrator)
            }
        }

### Cadastro [POST /register]

+ Request (application/json)

        {
            "name": "Isaac Batista",
            "email": "isaac.batista@gmail.com",
            "password": "Password123"
        }

+ Response 200 (application/json)

        {
            "user": {
                "name": "Isaac Batista",
                "email": "isaac.batista@gmail.com"
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InplYmlyaXRhQGVtYWlsLmNvbSIsImlhdCI6MTY1NDI5NzIxMSwiZXhwIjoxNjU0MzgzNjExfQ.g3_T6dgoNotgaDwKsF9kwljDrCgi8c5-ihCt3n12tP8",
                "role": "customer" (customer | seller | administrator)
            }
        }
        
## Rotas de Produtos [/products]

### Listar Todos [GET]

+ Request (application/json)
    + Headers
        
            Authorization: JWT Token

+ Response 200 (application/json)

        [
            {
                "id": 1,
                "name": "Skol Lata 250ml",
                "price": "2",
                "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg"
            },
            {
                "id": 2,
                "name": "Heineken 600ml",
                "price": "8",
                "urlImage": "http://localhost:3001/images/heineken_600ml.jpg"
            },
            {
                ...
            }
        ]

### Listar por ID [GET /{id}]

+ Request (application/json)
    + Headers
    
            Authorization: JWT Token
    
+ Parameters
    + id (number)

+ Response 200 (application/json)

        {
            "id": 1,
            "name": "Skol Lata 250ml",
            "price": "2",
            "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg"
        }
        
## Rotas de Vendas [/sale]

### Listar Todos por ID do usuário [GET /sale/{userId}]

+ Request (application/json)
    + Headers
        
            Authorization: JWT Token

+ Response 200 (application/json)

        [
            {
                "id": 1,
                "userId": 3,
                "sellerId": 2,
                "totalPrice": "150",
                "deliveryAddress": "Rua Teste",
                "deliveryNumber": "187",
                "saleDate": "2022-06-07T23:04:08.000Z",
                "status": "Pendente"
            },
            {
                "id": 2,
                "userId": 3,
                "sellerId": 2,
                "totalPrice": "150",
                "deliveryAddress": "Rua Teste",
                "deliveryNumber": "187",
                "saleDate": "2022-06-07T23:05:59.000Z",
                "status": "Pendente"
            },
        ]

### Criar Venda [POST]

+ Request (application/json)
    + Headers
    
            Authorization: JWT Token

    + Body

        {
            "userId": 3,
            "sellerId": 2,
            "totalPrice": 150,
            "products": [
                { "id": 1, "quantity": 2 },
                { "id": 2, "quantity": 3 }
            ],
            "deliveryAddress": "Rua Teste",
            "deliveryNumber": 187
        }
    

+ Response 201 (application/json)

        {
            "userId": 3,
            "sellerId": 2,
            "totalPrice": 150,
            "products": [
                { "id": 1, "quantity": 2 },
                { "id": 2, "quantity": 3 }
            ],
            "deliveryAddress": "Rua Teste",
            "deliveryNumber": 187
        }
