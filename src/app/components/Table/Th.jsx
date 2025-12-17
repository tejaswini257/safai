"use client";

import React from "react";

export default function Th({ children, style = {} }) {
    return (
        <th style={{ padding: '14px', textAlign: 'left', ...style }}>{children}</th>
    );
}
