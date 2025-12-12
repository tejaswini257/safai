// src/app/layout.js
import "./globals.css";

export const metadata = {
  title: "Safai Portal",
  description: "Municipal washroom portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#eef5f8] antialiased">
        {children}
      </body>
    </html>
  );
}
