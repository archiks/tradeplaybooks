import React from 'react';

/** Shared section heading: title left, supporting sentence right */
export const SectionHead: React.FC<{ title: string; children?: React.ReactNode; light?: boolean }> = ({ title, children, light }) => (
    <div className="grid lg:grid-cols-12 gap-x-10 gap-y-5 items-end">
        <h2 className={`h-display lg:col-span-7 text-4xl sm:text-5xl lg:text-6xl ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
        {children && (
            <p className={`lg:col-span-5 text-lg leading-relaxed ${light ? 'text-white/70' : 'text-ink/65'}`}>{children}</p>
        )}
    </div>
);
