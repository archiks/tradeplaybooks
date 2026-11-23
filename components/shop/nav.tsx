import React, { createContext, useContext } from 'react';

/** Tiny client-side navigation: go('/product/pizza-box'), go('/#catalog') */
export const NavContext = createContext<(path: string) => void>(() => {});
export const useNav = () => useContext(NavContext);

/** Internal link that navigates without a full page reload */
export const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }> = ({ to, onClick, children, ...rest }) => {
    const go = useNav();
    return (
        <a
            href={to}
            onClick={(e) => {
                onClick?.(e);
                if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                go(to);
            }}
            {...rest}
        >
            {children}
        </a>
    );
};
