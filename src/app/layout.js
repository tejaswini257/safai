// src/app/layout.js
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata = {
  title: "Safai Portal",
  description: "Municipal washroom portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased transition-colors duration-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}