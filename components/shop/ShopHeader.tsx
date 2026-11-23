import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Logo } from '../landing/Header';
import { Link } from './nav';
import { useCart } from './cart';

export const CartButton: React.FC<{ light?: boolean }> = ({ light }) => {
    const { count, open } = useCart();
    return (
        <button
            onClick={open}
            aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
            className={`relative grid place-items-center w-11 h-11 rounded-full transition-colors ${light ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-sage text-ink hover:bg-mist'}`}
        >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 grid place-items-center min-w-[1.25rem] h-5 px-1 rounded-full bg-lime text-ink text-xs font-bold ring-2 ring-white">
                    {count}
                </span>
            )}
        </button>
    );
};

/** Header for product, checkout and confirmation pages */
export const ShopHeader: React.FC<{ minimal?: boolean }> = ({ minimal }) => (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <Link to="/" aria-label="Garsabers home"><Logo /></Link>
            {!minimal && (
                <nav className="hidden sm:flex items-center gap-1 text-[15px] font-medium" aria-label="Main">
                    <Link to="/#catalog" className="px-3.5 py-2 rounded-full text-ink/70 hover:text-ink hover:bg-sage transition-colors">Catalog</Link>
                    <Link to="/#pricing" className="px-3.5 py-2 rounded-full text-ink/70 hover:text-ink hover:bg-sage transition-colors">Pricing</Link>
                    <Link to="/#faq" className="px-3.5 py-2 rounded-full text-ink/70 hover:text-ink hover:bg-sage transition-colors">FAQ</Link>
                </nav>
            )}
            {minimal
                ? <Link to="/#catalog" className="text-sm font-semibold rounded-full bg-sage px-4 py-2 hover:bg-ink hover:text-white transition-colors">Back to catalog</Link>
                : <CartButton />}
        </div>
    </header>
);
