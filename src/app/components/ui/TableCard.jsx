"use client";
import React from 'react';

export default function TableCard({ children }) {
    const style = { backgroundColor: '#fff', borderRadius: 12, marginTop: 20, overflowX: 'auto', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' };
    return <div style={style}>{children}</div>;
}
