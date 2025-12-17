"use client";

import React from "react";

export default function Td({ children, style = {} }) {
    return (
        <td style={{ padding: '14px 10px', verticalAlign: 'middle', ...style }}>{children}</td>
    );
}
