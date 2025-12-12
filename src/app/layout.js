// src/app/layout.js
import './globals.css'; // This line is crucial for Tailwind to work

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}