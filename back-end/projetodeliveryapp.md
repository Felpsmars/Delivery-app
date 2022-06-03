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
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InplYmlyaXRhQGVtYWlsLmNvbSIsImlhdCI6MTY1NDE5MjEzNywiZXhwIjoxNjU0Mjc4NTM3fQ.9xxWgNdnnSk9QVWJ5XiRtNDwcqlVwjCSOo2u2HHvknY",
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
                "id": 4,
                "name": "Isaac Batista",
                "email": "isaac.batista@gmail.com",
                "role": "customer"
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
