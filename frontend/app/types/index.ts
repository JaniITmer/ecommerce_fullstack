export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryName: string;
    inStock: boolean;
}

export interface Category {
    id: number;
    name: string;
    description: string;
    productCount: number;
}

export interface CartItem {
    id: number;
    productId: number;
    productName: string;
    productPrice: number;
    productImageUrl: string;
    quantity: number;
    totalPrice: number;
}

export interface Cart{
    items: CartItem[];
    totalAmount: number;
}

export interface Order{
    id: number;
    orderDate: string;
    status: string;
    totalAmount: number;
    items: CartItem[];
}
export interface OrderItem{
    
    productId: number;
    productName: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
}
export interface AuthResponse {
    token: string;
    email: string;
    firstName: string;
    role: string;
}
export interface User {
    token: string;
    email: string;
    frstName: string;
    role: string;
}