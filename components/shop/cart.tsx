import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { findProduct, lineTotalFor, PrintId } from '../../catalog';

export interface CartItem {
    slug: string;
    qty: number;        // boxes
    sizeIndex: number;  // 0 small, 1 medium, 2 large
    print: PrintId;
}

interface CartValue {
    items: CartItem[];
    count: number;      // number of lines
    subtotal: number;
    isOpen: boolean;
    open: () => void;
    close: () => void;
    add: (item: CartItem) => void;
    update: (index: number, qty: number) => void;
    remove: (index: number) => void;
    clear: () => void;
}

const KEY = 'garsabers_cart_v1';
const CartContext = createContext<CartValue | null>(null);

const load = (): CartItem[] => {
    try {
        const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
        return Array.isArray(raw) ? raw.filter((i: CartItem) => findProduct(i.slug)) : [];
    } catch { return []; }
};

const sameLine = (a: CartItem, b: CartItem) => a.slug === b.slug && a.sizeIndex === b.sizeIndex && a.print === b.print;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(load);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* storage unavailable */ }
    }, [items]);

    const add = useCallback((item: CartItem) => {
        setItems(prev => {
            const i = prev.findIndex(p => sameLine(p, item));
            if (i === -1) return [...prev, item];
            // Same product and options already in the cart: replace the quantity tier
            return prev.map((p, idx) => (idx === i ? { ...p, qty: item.qty } : p));
        });
    }, []);
    const update = useCallback((index: number, qty: number) => setItems(prev => prev.map((p, i) => (i === index ? { ...p, qty } : p))), []);
    const remove = useCallback((index: number) => setItems(prev => prev.filter((_, i) => i !== index)), []);
    const clear = useCallback(() => setItems([]), []);
    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    const subtotal = useMemo(() => items.reduce((sum, i) => {
        const p = findProduct(i.slug);
        return p ? sum + lineTotalFor(p, i.qty, i.sizeIndex, i.print) : sum;
    }, 0), [items]);

    const value = useMemo(() => ({ items, count: items.length, subtotal, isOpen, open, close, add, update, remove, clear }),
        [items, subtotal, isOpen, open, close, add, update, remove, clear]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside CartProvider');
    return ctx;
};
