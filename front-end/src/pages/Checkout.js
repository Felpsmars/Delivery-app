import React from 'react';

function Checkout() {
    const products = [
        {
            id: 1,
            description: "Cerveja Stella 250ml",
            quantity: 3,
            unity_value: 3.80,
        },
        {
            id: 2,
            description: "Cerveja Heikenen 250ml",
            quantity: 9,
            unity_value: 7,
        }
    ];

    return (
        <div>
            <div>Checkout Page</div>
            <div>
                <table>
                    <thead>
                        <th>Item</th>
                        <th>Descrição</th>
                        <th>Quantidade</th>
                        <th>Valor Unitário</th>
                        <th>Subtotal</th>
                        <th>Remover</th>
                    </thead>
                    {products.map((e) => 
                    <li 
                    key={e.id}
                    data-testeid={`element-order-table-name-${e.id}`}
                    >
                        <p>{e.id}</p>
                        <p>{e.description}</p>
                        <p>{e.quantity}</p>
                        <p>{e.unity_value}</p>
                        <p>{e.quantity * e.unity_value}</p>
                        <button type='submit'>Remover</button>
                    </li>)}
                </table>
            </div>
        </div>

    );
}

export default Checkout;
