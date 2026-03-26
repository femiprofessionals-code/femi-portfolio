import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Femi Falade",
  description: "Transformation and operations across Goldman Sachs, Carlyle, and T. Rowe Price. Building AI-native ventures. Thinking globally, executing systematically.",
  openGraph: {
    title: "Femi Falade",
    description: "Transformation and operations across Goldman Sachs, Carlyle, and T. Rowe Price.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
