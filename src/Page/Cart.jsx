import React from "react";
import { useContext } from "react";
import { CartContext } from "../App";
const Cart = () => {
    const cart_context = useContext(CartContext)
    return (
        <>
            <div className="container">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart_context.cart_items.map(cart_items => {
                                return (
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>{cart_items.name}</td>
                                        <td>{cart_items.quantity}</td>
                                        <td>{cart_items.quantity * cart_items.price}</td>

                                    </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Cart