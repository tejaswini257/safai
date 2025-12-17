"use client";
import React from 'react';

export default function Header({ title, subtitle, leftIcon = null, children }) {
    const styles = {
        wrapper: { borderRadius: 12, overflow: 'hidden' },
        header: { backgroundColor: '#0f172a', color: '#fff', padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        left: { display: 'flex', alignItems: 'center' },
        iconBox: { color: '#4f46e5', padding: 8, backgroundColor: '#1e293b', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
        title: { margin: 0, fontSize: '1.25rem', fontWeight: 700 },
        subtitle: { margin: 0, opacity: 0.85, fontSize: '0.95rem' },
        actions: { display: 'flex', gap: 12, alignItems: 'center' }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.header}>
                <div style={styles.left}>
                    <div style={styles.iconBox}>{leftIcon}</div>
                    <div>
                        <h2 style={styles.title}>{title}</h2>
                        {subtitle && <div style={styles.subtitle}>{subtitle}</div>}
                    </div>
                </div>
                <div style={styles.actions}>{children}</div>
            </div>
        </div>
    );
}
