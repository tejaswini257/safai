"use client";
import React from 'react';

export default function Button({ children, variant = 'primary', className = '', onClick, type = 'button' }) {
    const baseStyle = { display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600, borderRadius: 8, padding: '10px 16px', cursor: 'pointer', border: 'none' };
    const variants = {
        primary: { backgroundColor: '#2563eb', color: '#fff' },
        success: { backgroundColor: '#16a34a', color: '#fff' },
        ghost: { backgroundColor: 'transparent', color: '#475569', border: '1px solid transparent' }
    };

    const style = { ...baseStyle, ...(variants[variant] || variants.primary) };

    return (
        <button type={type} onClick={onClick} style={{ ...style, ...(className && {}) }}>{children}</button>
    );
}
