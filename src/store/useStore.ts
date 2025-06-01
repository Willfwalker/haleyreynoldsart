import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem, Product, User } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

interface CartState {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

interface UIState {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
}

// Auth Store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));

// Cart Store with persistence
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        total: 0,
        itemCount: 0,
      },
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.items.find(item => item.productId === product.id);
        
        let newItems: CartItem[];
        if (existingItem) {
          newItems = cart.items.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [...cart.items, { productId: product.id, quantity, product }];
        }
        
        const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        
        set({
          cart: {
            items: newItems,
            total,
            itemCount,
          },
        });
      },
      removeFromCart: (productId) => {
        const { cart } = get();
        const newItems = cart.items.filter(item => item.productId !== productId);
        const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        
        set({
          cart: {
            items: newItems,
            total,
            itemCount,
          },
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        const { cart } = get();
        const newItems = cart.items.map(item =>
          item.productId === productId
            ? { ...item, quantity }
            : item
        );
        const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        
        set({
          cart: {
            items: newItems,
            total,
            itemCount,
          },
        });
      },
      clearCart: () => {
        set({
          cart: {
            items: [],
            total: 0,
            itemCount: 0,
          },
        });
      },
      getCartTotal: () => get().cart.total,
      getCartItemCount: () => get().cart.itemCount,
    }),
    {
      name: 'cart-storage',
    }
  )
);

// UI Store
export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isCartOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setCartOpen: (open) => set({ isCartOpen: open }),
}));
