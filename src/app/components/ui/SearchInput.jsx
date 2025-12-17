"use client";
import React from 'react';

export default function SearchInput({ placeholder = 'Search...', style = {}, ...props }) {
    const inputStyle = {
        flexGrow: 1,
        padding: '10px 12px',
        borderRadius: 8,
        border: '1px solid #cbd5e1',
        fontSize: '1rem',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '10px center',
        paddingLeft: '36px'
    };

    return (
        <div style={{ display: 'flex', gap: 8, ...style }}>
            <input {...props} placeholder={placeholder} style={inputStyle} />
        </div>
    );
}
