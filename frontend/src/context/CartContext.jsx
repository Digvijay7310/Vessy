import { createContext, useReducer, useState } from 'react'

export const CartContext = createContext()

const initialState = {
    cart: [],
}
function cartReducer(state, action) {
    switch(action.type){
        case "ADD_TO_CART":
        return {
            ...state, 
            cart: [...state.cart, action.payload],
        }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            }
        case "CLEAR_CART":
            return {
                ...state, 
                cart: [],
            } 
        default:
            return state;   
    }
}

export function CartProvider ({children}) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product) => {
        dispatch({type: "ADD_TO_CART", payload: product})
    }

    const removefromCart = (id) => {
        dispatch({type: "REMOVE_FROM_CART", payload: id})
    }

    const clearCart = () => {
        dispatch({type: "CLEAR_CART"})
    }

    return (
        <CartContext.Provider value={{cart: state.cart,
            addToCart, 
            removefromCart,
            clearCart
        }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useState(CartContext)