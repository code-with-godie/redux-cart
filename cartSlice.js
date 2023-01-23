import {createSlice}from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
const initialState = {
    amount:0,
    total:0,
    cartItems:[],
    loading:false,
    error:null,
    pending:false
}
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,{payload})=>{
            state.cartItems.push(payload);
        },
        updateStart:(state)=>{
            state.loading = true;
        },
        onError:(state,{payload})=>{
            state.error = {message:payload,error:true}
            state.loading = false;
        },
        onSuccess:(state)=>{
            state.loading = false;
            state.error = false;
        },
        setCartItem:(state,{payload})=>{
            state.cartItems.push(payload);
        },
        removeCartItem : (state,{payload})=>{
            const newCart = state.cartItems.filter(cartItem => cartItem.id !== payload);
            state.cartItems = newCart;
        },
        increase :(state,{payload})=>{
            const newCart =  state.cartItems.map(cartItem =>{
                if(cartItem.id === payload) {
                    return cartItem.amount += 1;
                }
                return cartItem;
            });
            state.cartItems = newCart;
        
        },
        decrease:(state,{payload})=>{
            const newCart =  state.cartItems.map(cartItem =>{
                if(cartItem.id === payload) {
                    return cartItem.amount -= 1;
                }
                return cartItem;
            });
            state.cartItems = newCart;
        
        },
        getCartTotal :(state)=>{
            const {total,amount} = state.cartItems.reduce((cartTotal,cartItem)=>{
                const cartItemCost = cartItem.price * cartItem.amount;
                cartTotal.total += cartItemCost;
                cartTotal.amount += cartItem.amount;
            },{total,amount});
            
            state.amount = amount;
            state.total = parseFloat(total.toFixed(2));
        },
        clearCart:(state)=>{
            state.cartItems =[];
        }
    }
})


export const {addToCart, removeCartItem, increase, decrease, getCartTotal,setCartItem} = cartSlice.actions;
export const cart = useSelector(cartSlice.name);
export default cartSlice.reducer;